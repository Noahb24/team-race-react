import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPoints } from './homeSlice';

const Highlights = () => {

	const points = useSelector(selectCurrentPoints)

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

	function logRacers(){
		console.log(racers)
		console.log(racer_text)
	}


    return (
        <div className='homeComponent ms-auto' id='highlightSideBar'>
            <h1>Recent Updates</h1>
            <iframe width="420" height="236" src="https://www.youtube.com/embed/cS8a_S6G7VM"
                            title="YouTube video player"
							frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className='podcast'
                            allowFullScreen></iframe>
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
