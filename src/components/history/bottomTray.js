/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTimesByYearRaceSeries } from '../logic'
import { selectSuperCross, selectTrayState, update, updateSuperCross } from './statsSlice'
import { getSupercrossTimes } from './supercrossLogic'

const BottomTray = () => {
    const dispatch =  useDispatch()
    const trayState = useSelector(selectTrayState)
    const superCross = useSelector(selectSuperCross)

    const handleTrackChange = value => {
        dispatch(updateSuperCross({value, type: 'track'}))
    }

    const handleYearChange = value => {
        dispatch(updateSuperCross({value, type:'year'}))
    }

    useEffect(() => {
        async function updateRaceTimes () {
            await getTimesByYearRaceSeries(superCross.year, superCross.track)
            .then(res => {
                dispatch(updateSuperCross({type: 'times', value: getSupercrossTimes(res.data.filter(lap => lap.time > 0))}))
            })
        }
        updateRaceTimes()

    }, [superCross.track, superCross.year])

    const lapContainer = (racers) => {
        const minTotalTime = Math.min(...racers.map(e => e.totalRaceTime)) > 0 ? Math.min(...racers.map(e => e.totalRaceTime)) : 1
        // console.log(minTotalTime)
        return(
            <Col className ='supercrossLapContainer'>
                {racers.map(racer => {
                    return (
                        <div className='supercrossRacer'>
                            <p>Name: {racer.racer}</p>
                            <p>Time Off Leader: {racer.totalRaceTime - minTotalTime}</p>
                            <p>Lap Time: {racer.time}</p>
                        </div>

                    )
                })}
            </Col>
        )
    }

    const raceContainer = () => {
        const maxLaps =  Math.max(...superCross.times.map(e => e.lap)) > 0 ? Math.max(...superCross.times.map(e => e.lap)) : 1
        const laps = []

        for(let i=1; i <= maxLaps; i++){
            const send = superCross.times.filter(e => e.lap === i)
            laps.push(send.sort((a, b) => a.totalRaceTime - b.totalRaceTime))
        }
        return laps.map(lap => lapContainer(lap))
    }

    return (
        <Container fluid className='overlay' id={trayState}>
            <div>
                <Button variant='dark' className='closebtn' onClick={() => dispatch(update({value: 'trayClose', type: 'trayState'}))}>&times;</Button>
            </div>
            <div as={Row}>
                <div className='overlayContents'>
                    <span>
                        <h4 id={superCross.track === 'Robb Ranch' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Robb Ranch')}>Robb Ranch</h4>
                        <h4 id={superCross.track === 'Backwoods' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Backwoods')}>Backwoods</h4>
                        <h4 id={superCross.track === 'Sunol' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Sunol')}>Sunol</h4>
                        <Form.Select id='superCrossYearDropdown' value={superCross.year} onChange={e => handleYearChange(e.target.value)}>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                        </Form.Select>
                    </span>
                </div>
            </div>
            <Row className='supercrossTable'>
                {raceContainer()}
            </Row>
        </Container>
    )
}

export default BottomTray
