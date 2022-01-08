import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { sortingSketch, sortingActions } from './sorting/main'

const sketches = {
  sorting: {
    title: 'Sorting Algorithms',
    sketch: sortingSketch,
    actions: sortingActions,
  }
}

/** Sketch component
 * @returns A p5.js instance within a component
 */
export default function Sketch(props) {
  /** Reference for p5 to draw canvas */
  const sketchRef = createRef()

  /** Create new instance of p5 */
  let instance
  function handleClick() {
    instance = new p5(sketch => sketches[props.sketch].sketch(sketch, sketchRef), sketchRef.current)
  }
  // let instance
  // useEffect(() => instance = new p5(sketch => sketches[props.sketch].sketch(sketch, sketchRef)), [instance])

  /** Return sketch */
  return (
    <>
      <Card sx={{ maxHeight: '20%' }}>
        <CardHeader title={sketches[props.sketch].title} />
        {sketches[props.sketch].actions(handleClick)}
      </Card>
      <br />
      <Card sx={{ padding: '0px', height: '80%' }} ref={sketchRef} />
    </>
  )
}