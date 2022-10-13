import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPodcasts, update } from '../home/homeSlice';
import { createYoutubeEmbed } from '../logic';

const Podcasts = () => {
	const dispatch = useDispatch()
	const url = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : 'https://team-race-server.vercel.app'

	const podcasts = useSelector(selectPodcasts)

	function getPodcastUrls () {
		axios.get(`${url}/youtube/podcasts`)
		.then(res => {
			dispatch(update({type: 'podcasts', value: res.data}))
		})
	}

	useEffect(() => {
		getPodcastUrls()
	}, [])

    return (
        <div className='media'>
            <div className='trackFlyover'>
                <h1 className='header mainHeader'>Track Overview</h1>
                <div>
                    <h3 className='header' >Backwoods</h3>
					{
						createYoutubeEmbed("https://www.youtube.com/embed/KSizGnMjjww")
					}
                </div>
            </div>
            <div className='podcasts'>
                <h1 className='header mainHeader'>Podcasts</h1>
                <div className='videoScroll'>
					{
						podcasts.map((link, index) => {
							return createYoutubeEmbed(link.link, index)
						})
					}
                </div>
            </div>

        </div>

    )
}

export default Podcasts
