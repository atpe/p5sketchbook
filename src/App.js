import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Sketch from './sketches/Sketch'
import Test from './sketches/test/Test'

/** Main app component */
export default function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Sketch sketch={Test} />} />
      </Routes>
    </>
  )
}