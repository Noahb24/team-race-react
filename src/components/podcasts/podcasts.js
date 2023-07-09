import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPodcasts, selectDrone, update } from '../home/homeSlice';
import { createYoutubeEmbed } from '../logic';

const Podcasts = () => {
	const dispatch = useDispatch()
	const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

	const podcasts = useSelector(selectPodcasts)
	const drone = useSelector(selectDrone)

	function getPodcastUrls () {
		axios.get(`${url}/youtube/podcasts`)
		.then(res => {
			dispatch(update({type: 'podcasts', value: res.data}))
		})
	}

	function getDroneUrls () {
		axios.get(`${url}/youtube/drone`)
		.then(res => {
			dispatch(update({type: 'drone', value: res.data}))
		})
	}

	useEffect(() => {
		getPodcastUrls()
		getDroneUrls()
	}, [])

    return (
        <div className='media'>
            <div className='trackFlyover'>
                <h1 className='header mainHeader'>Track Overview</h1>
                <div className='videoScroll'>
					{
						drone.map((link, index) => {
							return createYoutubeEmbed(link, index)
						})
					}
                </div>
            </div>
            <div className='podcasts'>
                <h1 className='header mainHeader'>Podcasts</h1>
                <div className='videoScroll'>
					{
						podcasts.map((link, index) => {
							return createYoutubeEmbed(link, index)
						})
					}
                </div>
            </div>

        </div>

    )
}

export default Podcasts
