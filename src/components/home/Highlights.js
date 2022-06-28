import React from 'react';
import { Stack} from 'react-bootstrap'

const Highlights = () => {


    return (
        <div className='homeComponent ms-auto' id='highlightSideBar'>
            <h1>Recent Updates</h1>
            <iframe width="420" height="236" src="https://www.youtube.com/embed/7RP4vnPuJ1o" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            className='podcast'
                            allowfullscreen></iframe>
            <h1 id='pointsHeader'>Current Points</h1>
            <div className='points' id='teamPoints'>
                <h4>Team Race Points</h4>
                <p>Alisha - 1 +</p>
                <p>Noah - 1 -- Sean - 1 -- Chuck - 1</p>
                <p>BJ - 2 -- John - 2 -- Kelly - 2</p>
                <p>Kris - 3 -- Derek - 3 -- Ed - 3</p>
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