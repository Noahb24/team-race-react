import React from 'react'
import {Route, Routes} from "react-router-dom"
import {Container, Row} from 'react-bootstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/header'
import Home from './components/home/home';

function App() {

  return (
      <Container className='fullHeight' fluid>
        <Row className='header'>
          <Header/>
        </Row>
        <Row className='body'>
            <Routes>
              <Route path="team-race-react/" element={<Home />} />
              <Route path="team-race-react/history" />
              <Route path="team-race-react/leaderboard" />
              <Route path="team-race-react/book" />
              <Route path="team-race-react/pictures" />
            </Routes>
        </Row>
      </Container>
  );
}

export default App;
