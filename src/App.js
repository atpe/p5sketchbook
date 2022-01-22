// React imports
import React from 'react'
// React-Router-Dom imports
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@emotion/react'
// MUI component imports
import Box from '@mui/material/Box'
// Local component imports
import { index } from './sketches/index'
import NavBar from './navBar/NavBar'
import Home from './home/Home'

// Gets height of sketch from theme
function getViewHeight(theme) {
  // Get window dimensions
  const { innerWidth, innerHeight } = window
  // Get toolbar theming object
  const toolbar = theme.mixins.toolbar
  // Get default navbar height (56px)
  let navBarHeight = toolbar.minHeight
  // Get 'sm' breakpoint (600px)
  const sm = theme.breakpoints.up('sm')
  // If window is wider than 'sm' breakpoint...
  if (innerWidth > sm) {
    // Get large navbar height (64px)
    navBarHeight = toolbar[sm].minHeight
    // Else if window is landscape...
  } else if (innerWidth < innerHeight) {
    // Get 'xs' breakpoint (0px)
    const xs = theme.breakpoints.up('xs')
    // Create key for toolbar theme object
    const key = xs + ' and (orientation: landscape)'
    // Get small navbar height (48px)
    navBarHeight = toolbar[key].minHeight
  }
  // Set padding value for app container and <br /> tag
  const padding = 48
  // Return the height of remaining space for sketch component
  return innerHeight - navBarHeight - padding
}

export default function App() {
  const theme = useTheme()
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', p: '16px', height: getViewHeight(theme) }} >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/'>
            { // Iterate over categories in the index
              index.map((category, i) =>
                <Route key={`category-route-${i}`} path={category.route} >
                  { // Iterate over sketches in that category
                    category.sketches.map((sketch, j) =>
                      <Route key={`sketch-route-${j}`} path={sketch.route} element={<sketch.element />} />
                    )
                  }
                </Route>
              )
            }
          </Route>
        </Routes>
      </Box>
    </>
  )
}