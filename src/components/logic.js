import axios from "axios";
import { Form } from "react-bootstrap";
import _ from 'lodash'

require("dotenv").config();

export const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

//converts time in minutes w/ decimal to mn:sec.ms
export const timeToMinSec = time => {
	const abs_time = Math.abs(time)
	if (time < 0){
		return `-${Math.floor(abs_time)}:${((abs_time % 1) * 60).toFixed(3)}`
	} else if (time === 0){
		return ''
	} else {
		return `${Math.floor(abs_time)}:${((abs_time % 1) * 60).toFixed(3)}`
	}
}

export const createInput = (type, handler, name, optionArr, label, value) => {
    if(type === 'select'){
      return (
            <Form.Select size='sm' value={value} onChange={e => handler(name, e.target.value)}>
                {optionArr.map((option, i) => <option key={i} id='selected' value={option.value}>{option.name}</option>)}
            </Form.Select>
        )
    } else if (type === 'number' || type === 'text'){
        return (
                <Form.Control className={type==='number' ? 'inputNumber' : ''} type={type} value={value} size='sm' onChange={e => handler(name, e.target.value)}></Form.Control>
        )
    } else {
        return (
            <Form.Control size ='sm' className='inputNumber' readOnly>{value}</Form.Control>
        )
    }
}

export async function getTimesByYearRaceSeries (year, race) {
    const times = await axios.post(`${url}/race-times/queryrace`,
    {year: Number(year), race, race_type: 'series'})

    return times
}

export function createYoutubeEmbed(link, key = 1){
	return (
		<iframe width="420" height="236" src={link}
			title="YouTube video player" frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			className='podcast'
			key={key}
			allowFullScreen></iframe>
	)
}

export async function calculatePowerPoints(year){
	const response = await axios.get(`${url}/race-times/allRaceTimes/${year}`)
	const race_times = response.data
	const racers = {}
	const qualifying = {}
	const series = {}
	const races = {}
	const race_conversion = {}

	// construct object
	_.each(race_times, racer => {
		racers[racer.name] = {
			name: racer.name,
			finish: 0,
			qualifying: 0,
			series: 0
		}
		_.each(racer.races, race => {
			if(!races[race.name]){
				if(race.series){
					races[race.name] = race.series[0].team
				}
			} else {
				if(race.series && race.series[0].team >  races[race.name]){
					races[race.name] = race.series[0].team
				}
			}

			if(!qualifying[race.name]){
				qualifying[race.name] = {}
			}
			if(!series[race.name]){
				series[race.name] = {}
			}
			if(!qualifying[race.name][racer.name]){
				qualifying[race.name][racer.name] = {
					name: racer.name,
					qualifying: race.qualifyingTime
				}
			}
			if(!series[race.name][racer.name]){
				series[race.name][racer.name] = {
					name: racer.name,
					series: race.seriesAverage
				}
			}
		})
	})

	//find conversion
	_.each(races, (race_count, key) => {
		if(!race_conversion[key]){
			race_conversion[key] = {}
		}
		let i = 1
		let count = _.clone(race_count)
		while(i <= race_count){
			race_conversion[key][i] = count
			i++
			count --
		}
	})

	_.each(race_times, racer => {
		const name = racer.name
		_.each(racer.races, race => {
			if(race.series){
				const finish = race.series[0].team
				racers[name].finish += race_conversion[race.name][finish]
			}
		})
	})
	_.each(series, (value, key) => {
		series[key] = _.orderBy(value, 'series', 'desc')
	})
	_.each(qualifying, (value, key)=> {
		qualifying[key] = _.orderBy(value, 'qualifying', 'desc')
	})
	_.each(series, race => {
		_.each(race, (rider, index) => {
			racers[rider.name].series += index + 1
		})
	})
	_.each(qualifying, race => {
		_.each(race, (rider, index) => {
			racers[rider.name].qualifying += index + 1
		})
	})
	_.each(racers, racer => {
		racer.total = (racer.finish + racer.qualifying + racer.series)
	})

	return _.orderBy(racers, 'total', 'desc')
}

export async function getHeaderParams() {
	return await axios.get(`${url}/race-times/possible_params`)
}
