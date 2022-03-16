import React, { useEffect } from 'react';
import {Card, Form, Stack} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectSandBaggerList, selectSandBaggerYear, update } from './homeSlice';

require("dotenv").config();

const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

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
    const timeToMinSec = time => `${Math.floor(time)}:${((time % 1) * 60).toFixed(3)}`


    const sandCard = (racerName, raceName, factor, qualifying, average, year) => {
        const percent = `${(factor*100).toFixed(0)}%`
        const qualifyingTime = timeToMinSec(qualifying)
        const averageTime = timeToMinSec(average)

        return (
            <Card>
                <Card.Img />
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
        <Stack className='fullHeight ms-auto' id='sandBaggerSideBar'>
            <Form.Select onChange={e => dispatch(update({value: e.target.value, type: 'sandBaggerYear'}))}>
                <option value='2020'>2020</option>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
            </Form.Select>
            <h1 className='centerText'>Sand Bagger Watch List</h1>
            {sandBaggerList.map(racer => sandCard(racer.racerName, racer.name, racer.sandBaggerFactor, racer.qualifyingTime, racer.seriesAverage, racer.series[0].year))}
        </Stack>
        
    )
}

export default SandBagger