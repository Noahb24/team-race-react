import axios from "axios";
import { Form } from "react-bootstrap";

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
