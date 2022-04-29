import React from 'react';
import { Stack} from 'react-bootstrap'

const Highlights = () => {


    return (
        <Stack className='fullHeight ms-auto' id='highlightSideBar'>
            <h1>Highlights</h1>
            <iframe title="Robb Ranch Ted Talk" allowtransparency="true" height="315" width="100%" styles={"border: none; min-width: min(100%, 430px);"} scrolling="no" data-name="pb-iframe-player" 
            src="https://www.podbean.com/player-v2/?i=nnbjh-d80cdc-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=000000&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=3267a3&size=315" allowFullScreen=""></iframe>
        </Stack>
    )
}

export default Highlights