import React from 'react'
import {Route, Routes} from "react-router-dom"
import {Container, Row} from 'react-bootstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/header'
import Home from './components/home/home';
import TeamGen from './components/teamGen/teamMaker'
import History from './components/history/history';
import Podcasts from './components/podcasts/podcasts';

function App() {

  return (
      <Container className='fullHeight' fluid>
        <Row className='header'>
          <Header/>
        </Row>
        <Row className='body'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />}/>
              <Route path="/leaderboard" />
              <Route path="/book" />
              <Route path="/pictures" />
              <Route path='/teamgenerator' element={<TeamGen />}/>
              <Route path='/podcasts' element={<Podcasts />} />
            </Routes>
        </Row>
      </Container>
  );
}

export default App;
