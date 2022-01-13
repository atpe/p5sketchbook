/**
 * @module App
 * @author Adam Evans
 */

// React imports
import React from 'react'
// React-Router-Dom imports
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@emotion/react'
// MUI component imports
import Box from '@mui/material/Box'
// Local component imports
import NavBar from './navBar/NavBar'
import Home from './home/Home'
import Sketch from './sketches/Sketch'

/**
 * @param {Theme} theme Mui theme passed to theme provider
 * @returns {Number} The height of the window minus the app bar
 */
function getViewHeight(theme) {
  const toolbar = theme.mixins.toolbar
  const { innerWidth, innerHeight } = window

  // Get height of navbar from theme
  let navBarHeight = toolbar.minHeight
  if (innerWidth > theme.breakpoints.up('sm')) {
    const key = `${theme.breakpoints.up('sm')}`
    navBarHeight = toolbar[key].minHeight
  } else if (innerWidth < innerHeight) {
    const key = `${theme.breakpoints.up('xs')} and (orientation: landscape)`
    navBarHeight = toolbar[key].minHeight
  }

  const padding = 48

  // Return the height of remaining space
  return innerHeight - navBarHeight - padding
}

/**
 * Render app
 * 
 * @default
 * @returns {React.Component} App component
 */
export default function App() {
  const theme = useTheme()
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', p: '16px', height: getViewHeight(theme) }} >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/'>
            <Route path='sorting-algorithms'>
              <Route path='selection-sort' element={<Sketch sketch='selectionSort' />} />
              <Route path='insertion-sort' element={<Sketch sketch='insertionSort' />} />
              <Route path='bubble-sort' element={<Sketch sketch='bubbleSort' />} />
              <Route path='merge-sort' element={<Sketch sketch='mergeSort' />} />
              <Route path='heap-sort' element={<Sketch sketch='heapSort' />} />
            </Route>
            <Route path='game-and-graphics'>
              <Route path='ray-casting' element={<Sketch sketch='rayCasting' />} />
              <Route path='quadtree' element={<Sketch sketch='quadtree' />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </>
  )
}