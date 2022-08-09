import React from 'react';
import { Stack} from 'react-bootstrap'

const Highlights = () => {


    return (
        <div className='homeComponent ms-auto' id='highlightSideBar'>
            <h1>Recent Updates</h1>
            <iframe width="420" height="236" src="https://www.youtube.com/embed/cS8a_S6G7VM" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            className='podcast'
                            allowfullscreen></iframe>
            <h1 id='pointsHeader'>Current Points</h1>
            <div className='points' id='teamPoints'>
                <h4>Team Race Points</h4>
                <p>John - 3</p>
                <p>BJ - 4 -- Chuck - 4</p>
                <p>AJ - 5 -- Kali - 5 -- Kelly - 5 -- Clayton - 5</p>
                <p>Noah - 6 -- Mcnulty - 6 -- Dakota - 6 -- Ed - 6</p>
                <p>Kris - 7</p>
                <p>Shaun - 8 -- Derek - 8</p>
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