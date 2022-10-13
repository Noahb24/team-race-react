import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPoints, selectHighlightPodcast } from './homeSlice';
import { createYoutubeEmbed } from '../logic';

const Highlights = () => {
	const points = useSelector(selectCurrentPoints)
	const highlight_podcast = useSelector(selectHighlightPodcast)

	let racers = {}
	if(points[0] && points[0].points){
		const racer_point_names = Object.keys(points[0].points).sort((a,b) => {
			if(a < b) return -1
			if(a > b) return 1
			return 0
		})

		if(racer_point_names.length > 0){
			racer_point_names.forEach(racer => {
				const racer_points = points[0].points[racer]
				if(racers[`${racer_points}`]){
					racers[racer_points].push({
						name: racer,
						points: points[0].points[racer]
					})
				} else {
					racers[racer_points] = [{
						name: racer,
						points: points[0].points[racer]
					}]
				}
			})
		}
	}

	let racer_text = []

	Object.keys(racers).forEach(group => {
		let text = ''
		const racer_group = racers[group]
		racer_group.forEach((racer, index) => {
			text += `${racer.name} - ${racer.points}`
			if(index + 1 < racer_group.length){
				text += ' -- '
			}
		})
		racer_text.push(text)
	})

    return (
        <div className='homeComponent ms-auto' id='highlightSideBar'>
            <h1>Recent Updates</h1>
			<div id='highlight-podcast-box'>
				{
					highlight_podcast ? createYoutubeEmbed(highlight_podcast[0].link) : ''
				}
			</div>
            <h1 id='pointsHeader'>Current Points</h1>
            <div className='points' id='teamPoints'>
                <h4>Team Race Points</h4>
				{
					racer_text.map((line,index) => {
						return (<p key={index}>{line}</p>)
					})
				}
            </div>
            <div className='points' id='kidsPoints'>
                <h4>Youth Race Points</h4>
                <p>Owen - 10</p>
                <p>Riggs - 9</p>
                <p>Colton - 8</p>
                <p>Ainsley - 7</p>
            </div>
        </div>
    )
}

export default Highlights
