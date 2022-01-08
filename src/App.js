import { createTheme } from '@mui/material/styles';
// React imports
import React, { useRef } from 'react'
// React-Router-Dom imports
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@emotion/react';
// Mui component imports
import Box from '@mui/material/Box'
// Local component imports
import NavBar from './navBar/NavBar'
import Home from './home/Home'
import Sketch from './sketches/Sketch'

/** Main app component */
export default function App() {
  const theme = useTheme()
  const toolbar = theme.mixins.toolbar
  const { innerWidth, innerHeight } = window
  let navBarHeight = toolbar.minHeight
  if (innerWidth > theme.breakpoints.up('sm')) navBarHeight = toolbar[theme.breakpoints.up('sm')].minHeight
  else if (innerWidth < innerHeight) navBarHeight = toolbar[`${theme.breakpoints.up('xs')} and (orientation: landscape)`].minHeight
  const height = innerHeight - navBarHeight - 48 // 48 to accomodate padding and <br />
  console.log(innerHeight, navBarHeight, height);
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', p: '16px', height }} >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/'>
            <Route path='sorting' element={<Sketch sketch='sorting' />} />
          </Route>
        </Routes>
      </Box>
    </>
  )
}