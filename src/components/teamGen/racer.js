import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { racerChange, reset, selectRacers, deleteRacer } from './teamMakerSlice'

function Racer() {
    const racers = useSelector(selectRacers)
    const dispatch = useDispatch()

    function handleRacerChange (num, type, value) {
        const payload = {
            type,
            num,
            value: value
        }
        dispatch(racerChange(payload))
        dispatch(reset('teams'))
    }

    function handleDeleteRacer (num) {
        dispatch(deleteRacer(num))
    }

    return (
        <div className = "racers">
            {   
            racers.map( (element, i) => {
                return(
                    <div key={i} className="racer">
                        <p><button onClick={() => handleDeleteRacer(i)}>Delete</button>Name: <input id="name" type="text" onChange ={e => handleRacerChange(i, 'name', e.target.value)} value={racers[i].name}></input> -- Minute: <input id="time" type="number" onChange ={e => handleRacerChange(i, 'minute', Number(e.target.value))} value={racers[i].minute}></input> - Second: <input id="time" type="number" onChange ={e => handleRacerChange(i, 'second', Number(e.target.value))} value={racers[i].second}></input> - Millisecond: <input id="time" type="number" onChange ={e => handleRacerChange(i, 'ms', Number(e.target.value))} value={racers[i].ms}></input></p>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Racer