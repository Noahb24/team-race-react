import React from 'react';
import { Stack} from 'react-bootstrap'

const Highlights = () => {


    return (
        <Stack className='fullHeight ms-auto' id='highlightSideBar'>
            <h1>Highlights</h1>
            <iframe width="420" height="236" src="https://www.youtube.com/embed/w2-9kbnmg1o" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            className='podcast'
                            allowfullscreen></iframe>
        </Stack>
    )
}

export default Highlights