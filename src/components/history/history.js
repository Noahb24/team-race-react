import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatsTableParams, updateStatsTableParams } from './statsSlice'

import { Table } from 'react-bootstrap'

import { createInput } from '../logic'
import { tableHeaders } from './statsTableHeader'

import './history.css'
import StatsTable from './statTable'

const History = () => {
    const dispatch = useDispatch()
    const statsTableParams = useSelector(selectStatsTableParams)

    const handleStatsParmChanges = (type, value) => {
        dispatch(updateStatsTableParams({
            type,
            value
        }))
    }
    
    return (
        <Table>
            <thead>
                <tr>
                    {tableHeaders.map((header, i) => <td key={i} className={header.type==='number' || header.type==='none' ? 'inputNumber' : ''}>{header.label}</td>)}
                </tr>
                <tr>
                    {tableHeaders.map((header, i) => {
                        return (
                            <td key={i}>
                            {createInput(header.type, handleStatsParmChanges, header.name,
                                header.optionArr, header.label, statsTableParams[header.name])}
                            </td>
                        )
                    })}
                </tr>
            </thead>

            <StatsTable />

        </Table>
    )
}

export default History