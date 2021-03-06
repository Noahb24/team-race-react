/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {Card, Form, Stack} from 'react-bootstrap'
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



    const sandCard = (key, racerName, raceName, factor, qualifying, average, year) => {
        const percent = `${(factor*100).toFixed(0)}%`
        const qualifyingTime = timeToMinSec(qualifying)
        const averageTime = timeToMinSec(average)

        return (
            <Card key={key} id='sandCard'>
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
        <Stack className='homeComponent ms-auto' id='sandBaggerSideBar'>
            <h1 className='centerText'>Sand Bagger Watch List</h1>
            <Form.Select value={sandBaggerYear} onChange={e => dispatch(update({value: e.target.value, type: 'sandBaggerYear'}))}>
                <option value='2022'>2022</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
            </Form.Select>
            {// eslint-disable-next-line array-callback-return
            sandBaggerList.map((racer, i) => {if(racer.series){return sandCard(i, racer.racerName, racer.name, racer.sandBaggerFactor, racer.qualifyingTime, racer.seriesAverage, racer.series[0].year)}})}
        </Stack>
        
    )
}

export default SandBagger