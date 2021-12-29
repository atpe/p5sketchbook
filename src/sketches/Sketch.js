import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Box from '@mui/material/Box'

/** Sketch component
 * @returns A p5.js instance within a component
 */
export default function Sketch(props) {
  /** Reference for p5 to draw canvas */
  const sketchRef = createRef()

  /** Create new instance of p5 */
  let instance
  useEffect(() => instance = new p5(sketch => props.sketch(sketch, sketchRef), sketchRef.current), [instance])

  /** Return sketch */
  return (
    <Box sx={{ height: '100%' }} ref={sketchRef} />
  )
}