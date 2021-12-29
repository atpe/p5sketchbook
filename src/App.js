import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'

import Sketch from './sketches/Sketch'
import Test from './sketches/test/Test'

import AppBar from './navBar/NavBar'

/** Main app component */
export default function App() {
  return (
    <>
      <AppBar />
      <br />
      <Container sx={{ height: '90%' }} >
        <Routes>
          <Route path='/' element={<Sketch sketch={Test} />} />
        </Routes>
      </Container>
    </>
  )
}