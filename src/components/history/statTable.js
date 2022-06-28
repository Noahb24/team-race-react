import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeToMinSec, url } from '../logic'
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
            const stats = res.data.filter(element => Number(element.time) > 0)
            dispatch(updateStats(stats))
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
                                    if(header.name === 'time'){
                                        return (
                                            <td key={i}>{timeToMinSec(stat[header.name])}</td>                                        )
                                    } else {
                                        return (
                                            <td key={i}>{stat[header.name]}</td>
                                        )
                                    }
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