import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { sortingSketch, sortingActions } from './sorting/main'

const sketches = {
  selectionSort: {
    title: 'Selection Sort',
    sketch: sortingSketch,
    actions: sortingActions,
  }
}

/** Sketch component
 * @returns A p5.js instance within a card component
 */
export default function Sketch(props) {
  /** Reference for component to attatch p5 canvas */
  const sketchRef = createRef()

  /** Instance of p5.js */
  let instance
  useEffect(() => instance = new p5(sketch => sketches[props.sketch].sketch(sketch, sketchRef), sketchRef.current))

  const actions = {
    isLooping: () => instance.isLooping(),
    start: () => instance.loop(),
    pause: () => instance.noLoop(),
  }

  /** Return sketch */
  return (
    <>
      <Card>
        <CardHeader title={sketches[props.sketch].title} />
        {sketches[props.sketch].actions(actions)}
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={sketchRef} />
    </>
  )
}