/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {Card, Form, TabContent} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { calculatePowerPoints } from '../logic'
import { selectPowerPointsList, selectSandBaggerYear, update } from './homeSlice';

const PowerPoints = () => {
	const dispatch = useDispatch()

	const sandBaggerYear = useSelector(selectSandBaggerYear)
	const powerPointsList = useSelector(selectPowerPointsList)

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

	const getPowerPoints = async () => {
		const year = sandBaggerYear
		const points = await calculatePowerPoints(year)
		dispatch(update({value: points, type: 'powerPointsList'}))
	}

	const pointsCard = (key, racerName, points) => {
		return (
			<Card key={key} id='sandCard'>
				<Card.Body>
					<Card.Title>{racerName}</Card.Title>
					 <Card.Text>Points: {points}</Card.Text>
				</Card.Body>
			</Card>
		)
	}

	useEffect(() => {
		getPowerPoints()
	}, [sandBaggerYear])

	return (
		<TabContent className='homeComponent ms-auto' id='sandBaggerSideBar'>
			<h1 className='centerText'>Power Points</h1>
			<Form.Select value={sandBaggerYear} onChange={e => dispatch(update({value: e.target.value, type: 'sandBaggerYear'}))}>
				{
					getYears()
				}
			</Form.Select>
			{
				powerPointsList.map((power, index) => pointsCard(index, power.name, power.total))
			}
		</TabContent>
	)
}

export default PowerPoints
