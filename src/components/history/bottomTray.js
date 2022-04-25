/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTimesByYearRaceSeries } from '../logic'
import { selectSuperCross, selectTrayState, update, updateSuperCross } from './statsSlice'

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
                dispatch(updateSuperCross({type: 'times', value: res.data}))
            })
        }
        updateRaceTimes()
    }, [superCross.track, superCross.year])

    const lapContainer = () => {

        return(
            <Col className ='lapContainer'>
                <p>Test</p>
            </Col>
        )
    }

    return (
        <Container fluid className='overlay' id={trayState}>
            <div>
                <Button variant='dark' className='closebtn' onClick={() => dispatch(update({value: 'trayClose', type: 'trayState'}))}>&times;</Button>
            </div>
            <Row>
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
            </Row>
            <Row>
                {lapContainer()}
                {lapContainer()}
            </Row>
        </Container>
    )
}

export default BottomTray