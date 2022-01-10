// React imports
import React, { useRef } from 'react'
// React-Router-Dom imports
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@emotion/react'
// Mui component imports
import Box from '@mui/material/Box'
// Local component imports
import NavBar from './navBar/NavBar'
import Home from './home/Home'
import Sketch from './sketches/Sketch'

function getViewHeight(theme) {
  const toolbar = theme.mixins.toolbar
  const { innerWidth, innerHeight } = window
  let navBarHeight = toolbar.minHeight
  if (innerWidth > theme.breakpoints.up('sm')) navBarHeight = toolbar[theme.breakpoints.up('sm')].minHeight
  else if (innerWidth < innerHeight) navBarHeight = toolbar[`${theme.breakpoints.up('xs')} and (orientation: landscape)`].minHeight
  const height = innerHeight - navBarHeight - 48 // 48 to accomodate padding and <br />
  return height
}

/** Main app component */
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
            </Route>
          </Route>
        </Routes>
      </Box>
    </>
  )
}