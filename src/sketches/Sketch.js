import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

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
    <Card sx={{ height: '100%' }} >
      <CardHeader title="Sketch" />
      <CardMedia sx={{ height: '100%' }} raised={true} ref={sketchRef} />
    </Card>
  )
}