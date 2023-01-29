import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeToMinSec, url } from '../logic'
import { selectLoadingRaceTimes, selectStats, selectStatsTableParams, updateStats, update } from './statsSlice'
import { tableHeaders } from './statsTableHeader'
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import ToastContainer from 'react-bootstrap/ToastContainer';

const StatsTable = () => {
    const dispatch = useDispatch()

    const stats = useSelector(selectStats)
    const tableParams = useSelector(selectStatsTableParams)
	const loading = useSelector(selectLoadingRaceTimes)

    useEffect(() => {
		dispatch(updateStats([]))
		dispatch(update({type: 'loading_race_times', value: true}))
        axios({
            method: 'post',
            url: `${url}/race-times/queryrace`,
            data: tableParams
        }).then(res => {
            const stats = res.data.filter(element => Number(element.time) > 0)
            dispatch(updateStats(stats))
        })
		.finally(() => {
			dispatch(update({type: 'loading_race_times', value: false}))
		})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableParams])

    return (
        <tbody>
			<ToastContainer position='middle-center'>
				<Toast show={loading}>
					<Toast.Header closeButton={false}>
						Loading
					</Toast.Header>
					<Toast.Body>
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
						Loading Race Times...
					</Toast.Body>
				</Toast>
			</ToastContainer>
            {
                stats.map((stat, i) => {
                    return (
                        <tr key={i}>
                            {
                                tableHeaders.map((header, i) => {
                                    if(header.name === 'time' || header.name === 'lap_diff'){
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
