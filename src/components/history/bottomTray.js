/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTimesByYearRaceSeries, timeToMinSec } from '../logic'
import { handleLoading, selectRaceStats, selectTrayState, update, updateRaceStats } from './statsSlice'
import _ from 'lodash'

const BottomTray = () => {
    const dispatch =  useDispatch()
    const trayState = useSelector(selectTrayState)
    const race_stats = useSelector(selectRaceStats)

    const handleTrackChange = value => {
        dispatch(updateRaceStats({value, type: 'track'}))
    }

    const handleYearChange = value => {
        dispatch(updateRaceStats({value, type:'year'}))
    }

	function createRow (key, name, time, diff) {
		return (
			<tr key={key}>
				<td>{name}</td>
				<td>{timeToMinSec(time)}</td>
				<td>{timeToMinSec(diff)}</td>
			</tr>
		)
	}

	function FastTimes() {
		const times = _.orderBy(race_stats.racer_times, ['fast_time', 'racer'], ['asc', 'asc'])
		const best_lap = times[0] ? times[0].fast_time : 0
		return (
			<Table striped hover bordered variant='dark'>
				<thead>
					<tr>
						<td>Name</td>
						<td>Best Lap</td>
						<td>Lap Diff</td>
					</tr>
				</thead>
				<tbody>
					{
						_.map(times, (time, index) => {
							return createRow(index, time.racer, time.fast_time, best_lap - time.fast_time)
						})
					}
				</tbody>
			</Table>
		)
	}

	function AverageTimes() {
		const times = _.orderBy(race_stats.racer_times, ['average_time', 'racer'], ['asc', 'asc'])
		const best_average = times[0] ? times[0].average_time : 0
		return (
			<Table striped hover bordered variant='dark'>
				<thead>
					<tr>
						<td>Name</td>
						<td>Average Lap</td>
						<td>Lap Diff</td>
					</tr>
				</thead>
				<tbody>
					{
						_.map(times, (time, index) => {
							return createRow(index, time.racer, time.average_time, best_average - time.average_time)
						})
					}
				</tbody>
			</Table>
		)
	}

	function getTimes() {
		const times = race_stats.times
		let fast_times_map = {}
		let racers = []

		_.each(times, time => {
			if(!_.includes(racers, time.racer)){
				racers.push(time.racer)
			}
			if(fast_times_map[time.racer]){
				if(time.time < fast_times_map[time.racer]){
					fast_times_map[time.racer] = time.time
				}
			} else {
				fast_times_map[time.racer] = time.time
			}
		})

		const return_times = _.map(racers, racer => {
			let sum = 0
			let count = 0
			_.each(times, time => {
				if(time.racer === racer){
					sum += time.time
					count ++
				}
			})
			const average = sum / count
			return {
				racer: racer,
				average_time: average,
				fast_time: fast_times_map[racer]
			}
		})
		dispatch(updateRaceStats({type: 'racer_times', value: return_times}))
	}

	function handleUpdateTimes(){
		dispatch(updateRaceStats({type: 'times', value: []}))
		dispatch(updateRaceStats({type: 'racer_times', value: []}))
		dispatch(update({type: 'loading_stat_times', value: true}))
		dispatch(handleLoading())
		getTimesByYearRaceSeries(race_stats.year, race_stats.track)
		.then(res => {
			dispatch(updateRaceStats({type: 'times', value: res.data}))
		})
		.finally(() => {
			dispatch(update({type: 'loading_stat_times', value: false}))
			dispatch(handleLoading())
		})
	}

	useEffect(() => {
		if(trayState === 'trayOpen'){
			handleUpdateTimes()
		}
	}, [race_stats.track, race_stats.year, trayState])

	useEffect(() => {
		if(race_stats.times.length > 0){
			getTimes()
		}
	}, [race_stats.times])

    return (
		<div className='overlay' id={trayState}>
			<div>
				<Button variant='dark' className='closebtn' onClick={() => dispatch(update({value: 'trayClose', type: 'trayState'}))}>&times;</Button>
			</div>
			<div>
				<div className='overlayContents'>
					<span>
						<h4 id={race_stats.track === 'Robb Ranch' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Robb Ranch')}>Robb Ranch</h4>
						<h4 id={race_stats.track === 'Backwoods' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Backwoods')}>Backwoods</h4>
						<h4 id={race_stats.track === 'Sunol' ? 'selected' : 'unselected'} onClick={() => handleTrackChange('Sunol')}>Sunol</h4>
						<Form.Select id='superCrossYearDropdown' value={race_stats.year} onChange={e => handleYearChange(e.target.value)}>
							<option>2023</option>
							<option>2022</option>
							<option>2021</option>
							<option>2020</option>
						</Form.Select>
					</span>
				</div>
			</div>
			<div className='times-row'>
				<div className='best-lap-container'>
					<h4>Best Lap</h4>
					<FastTimes />
				</div>
				<div className='average-lap-container'>
					<h4>Average Lap</h4>
					<AverageTimes />
				</div>
			</div>
		</div>
    )
}

export default BottomTray
