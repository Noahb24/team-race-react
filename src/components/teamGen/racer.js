import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteRacer, racerChange, selectRacers } from './teamMakerSlice'

function Racer() {
    const racers = useSelector(selectRacers)
    const dispatch = useDispatch()

    function handleRacerChange (num, type, value) {
        const payload = {
            type,
            num,
            value: value.target.value
        }
        dispatch(racerChange(payload))
    }

    return (
        <div className = "racers">
            {   
            racers.map( (element, i) => {
                return(
                    <div key={i} className="racer">
                        <p>Name: 
                           <input id="name" type="text" onChange ={e => handleRacerChange(i, 'name', e)} value={racers[i].name}></input>
                        </p>

                        <p>Time (mm:ss.ms): 
                           <input id="time" type="text" onChange ={e => handleRacerChange(i, 'time', e)} value={racers[i].time}></input>
                           {/*button onClick = {() => dispatch(deleteRacer(i))}>Delete</button> */}
                        </p>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Racer