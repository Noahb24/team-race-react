 /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSortColumn, selectSortType, selectStats, selectStatsTableParams, sortStats, update, updateStatsTableParams, selectLoading, selectHeaderParams } from './statsSlice'

import { Form, Table, Button } from 'react-bootstrap'

import { createInput, getHeaderParams } from '../logic'
import { tableHeaders } from './statsTableHeader'

import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import ToastContainer from 'react-bootstrap/ToastContainer';

import './history.css'
import StatsTable from './statTable'
import BottomTray from './bottomTray'
import _ from 'lodash'

const History = () => {
    const dispatch = useDispatch()
    const statsTableParams = useSelector(selectStatsTableParams)
    const sortType = useSelector(selectSortType)
    const sortColumn = useSelector(selectSortColumn)
    const stats = useSelector(selectStats)
	const loading = useSelector(selectLoading)
	const header_params = useSelector(selectHeaderParams)

	const headerParams = () => {
		if(_.isEmpty(header_params)){
			getHeaderParams()
			.then(params => {
				dispatch(update({type:'header_params', value: params.data}))
			})
		}
	}

	const getTableHeaders = () => {
		_.debounce(headerParams, 5000)
		function createOption(value){
			return {
				name: `${value}`,
				value: value
			}
		}
		const all = createOption('All')

		const years = [all]
		_.each(header_params.year, year => {
			years.push(createOption(year))
		})

		const racers = [all]
		_.each(header_params.racer, racer => {
			racers.push(createOption(racer))
		})

		const races = [all]
		_.each(header_params.race, race => {
			races.push(createOption(race))
		})

		tableHeaders[0].optionArr = racers
		tableHeaders[5].optionArr = races
		tableHeaders[6].optionArr = years
		return tableHeaders
	}

    const handleStatsParmChanges = (type, value) => {
        dispatch(updateStatsTableParams({
            type,
            value
        }))
    }

    useEffect(() => {
        dispatch(sortStats())
    }, [sortType, sortColumn, stats])

	useEffect(() => {
		headerParams()
	}, [])

    return (
		<div>
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
			<BottomTray />
			<Table responsive>
				<thead>
					<tr>
						<td>Sort</td>
						<td colSpan='3'><Form.Select size='sm' value={sortType} onChange={e => dispatch(update({type:'sortType', value:e.target.value}))}>
							<option value='asc'>ascending</option>
							<option value='dsc'>descending</option>
						</Form.Select></td>
						<td ><Form.Select size='sm' value={sortColumn} onChange={e => dispatch(update({type:'sortColumn', value:e.target.value}))}>
							{getTableHeaders().map((header, i) => <option key={i} value={header.name}>{header.label}</option>)}
						</Form.Select></td>
						<td>
							<Button onClick={() => dispatch(update({value: 'trayOpen', type: 'trayState'}))}>Race Stats</Button>
						</td>
					</tr>
					<tr>
						{getTableHeaders().map((header, i) => <td key={i} className={header.type==='number' || header.type==='none' ? 'inputNumber' : ''}>{header.label}</td>)}
					</tr>
					<tr>
						{getTableHeaders().map((header, i) => {
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
		</div>
    )
}

export default History
