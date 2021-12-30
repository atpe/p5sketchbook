import { createTheme } from '@mui/material/styles';
// React imports
import React from 'react'
// React-Router-Dom imports
import { Routes, Route } from 'react-router-dom'
// Mui component imports
import Container from '@mui/material/Container'
// Local component imports
import AppBar from './navBar/NavBar'
import Home from './home/Home'
import Sketch from './sketches/Sketch'
// Local sketch imports
import test from './sketches/test/test'
import sorting from './sketches/sorting/main'

/** Main app component */
export default function App() {
  return (
    <>
      <AppBar />
      <br />
      <Container sx={{ height: '90%' }} >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/'>
            <Route path='sorting' element={<Sketch sketch={sorting} />} />
            <Route path='test' element={<Sketch sketch={test} />} />
          </Route>
        </Routes>
      </Container>
    </>
  )
}