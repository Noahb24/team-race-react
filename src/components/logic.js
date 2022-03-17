import { Form } from "react-bootstrap";

require("dotenv").config();

export const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

//converts time in minutes w/ decimal to mn:sec.ms
export const timeToMinSec = time => `${Math.floor(time)}:${((time % 1) * 60).toFixed(3)}`

export const createInput = (type, handler, name, optionArr, label, value) => {
    if(type === 'select'){
        return (
            <Form.Select size='sm' value={value} onChange={e => handler(name, e.target.value)}>
                {optionArr.map((option, i) => <option key={i} value={option.value}>{option.name}</option>)}
            </Form.Select>
        )
    } else if (type === 'number' || type === 'text'){
        return (
                <Form.Control className={type==='number' ? 'inputNumber' : ''} type={type} value={value} size='sm' onChange={e => handler(name, e.target.value)}></Form.Control>
        )
    } else {
        return (
            <Form.Control size ='sm' className='inputNumber' readOnly>{value}</Form.Control>
        )
    }
}