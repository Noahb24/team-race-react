/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSortColumn, selectSortType, selectStats, selectStatsTableParams, sortStats, update, updateStatsTableParams } from './statsSlice'

import { Form, Table, Button } from 'react-bootstrap'

import { createInput } from '../logic'
import { tableHeaders } from './statsTableHeader'

import './history.css'
import StatsTable from './statTable'
import BottomTray from './bottomTray'

const History = () => {
    const dispatch = useDispatch()
    const statsTableParams = useSelector(selectStatsTableParams)
    const sortType = useSelector(selectSortType)
    const sortColumn = useSelector(selectSortColumn)
    const stats = useSelector(selectStats)

    const handleStatsParmChanges = (type, value) => {
        dispatch(updateStatsTableParams({
            type,
            value
        }))
    }

    useEffect(() => {
        dispatch(sortStats())
    }, [sortType, sortColumn, stats])

    return (
        <Table>
            <thead>
                <tr>
                    <td>Sort</td>
                    <td colSpan='3'><Form.Select size='sm' value={sortType} onChange={e => dispatch(update({type:'sortType', value:e.target.value}))}>
                        <option value='asc'>ascending</option>
                        <option value='dsc'>descending</option>
                    </Form.Select></td>
                    <td ><Form.Select size='sm' value={sortColumn} onChange={e => dispatch(update({type:'sortColumn', value:e.target.value}))}>
                        {tableHeaders.map((header, i) => <option key={i} value={header.name}>{header.label}</option>)}
                    </Form.Select></td>
                    <td>
                        <Button onClick={() => dispatch(update({value: 'trayOpen', type: 'trayState'}))}>Self Destruct</Button>
                    </td>
                </tr>
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
            <BottomTray />
        </Table>
    )
}

export default History