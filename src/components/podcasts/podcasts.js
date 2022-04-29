import React from 'react';
import { Stack } from 'react-bootstrap'

const Podcasts = () => {

    return (
        <div className='media'>
            <div className='trackFlyover'>
                <h1 className='header mainHeader'>Track Overview</h1>
                <div>
                    <h3 className='header' >Backwoods</h3>
                    <iframe width="420" height="236" src="https://www.youtube.com/embed/KSizGnMjjww" 
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>
                </div>
            </div>
            <div className='podcasts'>
                <h1 className='header mainHeader'>Podcasts</h1>
                <div className='videoScroll'>
                    <iframe width="420" height="236" src="https://www.youtube.com/embed/3qu9wE0FVCQ" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            className='podcast'
                            allowfullscreen></iframe>
                    <iframe width="420" height="236" src="https://www.youtube.com/embed/w2-9kbnmg1o" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            className='podcast'
                            allowfullscreen></iframe>
                </div>
            </div>
        
        </div>
       

    )
}

export default Podcasts