import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { url } from '../logic'
import { selectStats, selectStatsTableParams, updateStats } from './statsSlice'
import { tableHeaders } from './statsTableHeader'


const StatsTable = () => {
    const dispatch = useDispatch()

    const stats = useSelector(selectStats)
    const tableParams = useSelector(selectStatsTableParams)

    useEffect(() => {
        
        axios({
            method: 'post',
            url: `${url}/race-times/queryrace`,
            data: tableParams
        }).then(res => {
            dispatch(updateStats(res.data))
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableParams])

    return (
        <tbody>
            {
                stats.map((stat, i) => {
                    return (
                        <tr key={i}>
                            {
                                tableHeaders.map((header, i) => {
                                    return (
                                        <td key={i}>{stat[header.name]}</td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default StatsTable