import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Racer from './racer'
import Teams from './raceTeams'
import { findClosestNthTimes } from './teamMakerlogic'
import { addRacer, getTeams, reset, selectRacers, selectTeams, selectTeamSize, teamSizeChange } from './teamMakerSlice'
import './teamMaker.css'
import {Col, Row} from 'react-bootstrap'

function TeamMaker() {
    const dispatch = useDispatch()
    const teamSize = useSelector(selectTeamSize)
    const racers = useSelector(selectRacers)
    const teams = useSelector(selectTeams)

    function handleGetTeams () {
        let teams
        try {
            teams = findClosestNthTimes(racers, teamSize)
        } catch(err) {
            window.alert('Error in Creating Teams')
            console.log(err)
            return
        }
        dispatch(getTeams(teams))
    }
    
    
    return (
        <Row>
            <Col className = 'teamMaker'>
                <div className = 'header'>
                    <label>
                        Team Size:
                        <select id="teamSize" onChange ={e => dispatch(teamSizeChange(e.target.value))} type='number' value = {teamSize}>
                            <option key='a' value={0} disabled>Select</option>
                            {
                                // eslint-disable-next-line array-callback-return
                                racers.map((racer, i) => {
                                    const num = i +1
                                    if(num !== 1 && num !== racers.length && racers.length % num === 0){
                                        return (
                                            <option key={i} id={`option${i}`} value = {num}>{num}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </label>
                    <button onClick={() => {
                        dispatch(reset())
                        dispatch(addRacer())}}>Add Racer</button>
                    <button onClick={() => handleGetTeams()}>Get Teams</button>
                </div>

                <div>
                    <h2>Racers: {racers.length}</h2>
                        <Racer />
                </div>
            </Col>
            <Col>
                <div>
                    <h2>Teams: {teams.length}</h2>
                        <Teams />
                </div>
            </Col>
        </Row>
    )
}

export default TeamMaker