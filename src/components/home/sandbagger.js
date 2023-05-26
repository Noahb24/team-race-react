/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {Card, Form, TabContent} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectSandBaggerList, selectSandBaggerYear, update } from './homeSlice';
import {url, timeToMinSec} from '../logic'


const SandBagger = () => {
    const dispatch = useDispatch()

    const sandBaggerYear = useSelector(selectSandBaggerYear)
    const sandBaggerList = useSelector(selectSandBaggerList)

    const getSandBaggers = () => {
        const year = sandBaggerYear

        axios.get(`${url}/race-times/allRaceTimes/${year}`)
        .then(response => {
            const raceTimes = response.data
            const highestSand = raceTimes.map(racer => {
                let highestSand = {sandBaggerFactor: -1000}
                racer.races.forEach(race => {
                    if(highestSand.sandBaggerFactor < race.sandBaggerFactor){
                        highestSand = race
                    }
                })
                racer.highestSand = highestSand
                highestSand.racerName = racer.name
                return highestSand
            })
            const sorted = highestSand.sort((a, b) => {return  b.sandBaggerFactor - a.sandBaggerFactor})
            dispatch(update({value: sorted, type: 'sandBaggerList'}))
        })
    }

	const getYears = () => {
		const current_year = new Date().getFullYear()
		const first_year = 2020
		const years = [
			<option key='all' value='all'>All</option>
		]
		let param_year = current_year
		while(param_year >= first_year){
			years.push(<option key={param_year} value={param_year}>{param_year}</option>)
			param_year -= 1
		}

		return years
	}

    const sandCard = (key, racerName, raceName, factor, qualifying, average, year) => {
        const percent = `${(factor*100).toFixed(0)}%`
        const qualifyingTime = timeToMinSec(qualifying)
        const averageTime = timeToMinSec(average)

        return (
            <Card key={key} id='sandCard'>
                <Card.Body>
                    <Card.Title>{racerName}</Card.Title>
                    <Card.Text>Race: {raceName} - {year}</Card.Text>
                    <Card.Text>Sandiness: {percent}</Card.Text>
                    <Card.Text>Qualifying Time: {qualifyingTime}</Card.Text>
                    <Card.Text>Average Race Time: {averageTime}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    useEffect(() => {
        getSandBaggers()
      }, [sandBaggerYear])

    return (
        <TabContent className='homeComponent ms-auto' id='sandBaggerSideBar'>
            <h1 className='centerText'>Sand Bagger Watch List</h1>
            <Form.Select value={sandBaggerYear} onChange={e => dispatch(update({value: e.target.value, type: 'sandBaggerYear'}))}>
                {
					getYears()
				}
            </Form.Select>
            {// eslint-disable-next-line array-callback-return
            	sandBaggerList.map((racer, i) => {if(racer.series){return sandCard(i, racer.racerName, racer.name, racer.sandBaggerFactor, racer.qualifyingTime, racer.seriesAverage, racer.series[0].year)}})
			}
        </TabContent>

    )
}

export default SandBagger
