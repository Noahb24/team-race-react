import React from 'react'
import { useSelector } from 'react-redux'
import { selectRacers, selectTeams } from './teamMakerSlice'
import { msToTime } from './teamMakerlogic'
import './teamMaker.css'

function Teams() {
    const teams = useSelector(selectTeams)
    const racers = useSelector(selectRacers)

    return(
        <div className = 'racers'>
            {
                teams.map((team, i) => {
                    return(
                        <div key={i} className = 'racer'>
                            <h3>Team: {i + 1} Total Time: {msToTime(team.total)}</h3>
                            {
                                team.combo.map((racer, j) => {
                                    const racerIndex = racers.find(e => e.name === racer)
                                    console.log(racerIndex)
                                    return (
                                    <div key={j}>
                                        <h4>{racer} - {`${racerIndex.minute}:${racerIndex.second}.${racerIndex.ms}`}</h4>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Teams