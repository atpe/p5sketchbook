import React, { createRef, useEffect } from 'react'

import p5 from 'p5'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { sortingSketch, sortingActions } from './sortingAlgorithms/main'
import SelectionSort from './sortingAlgorithms/algorithms/selectionSort'
import InsertionSort from './sortingAlgorithms/algorithms/insertionSort'
import BubbleSort from './sortingAlgorithms/algorithms/bubbleSort'
import MergeSort from './sortingAlgorithms/algorithms/mergeSort'


/** Sketch component
 * @returns A p5.js instance within a card component
 */
export default function Sketch(props) {
  /** Reference for component to attatch p5 canvas */
  const sketchRef = createRef()

  const sketches = {
    selectionSort: {
      title: 'Selection Sort',
      sketch: sketch => sortingSketch(sketch, new SelectionSort(sketchRef)),
      actions: sortingActions,
    },
    insertionSort: {
      title: 'Insertion Sort',
      sketch: sketch => sortingSketch(sketch, new InsertionSort(sketchRef)),
      actions: sortingActions,
    },
    bubbleSort: {
      title: 'Bubble Sort',
      sketch: sketch => sortingSketch(sketch, new BubbleSort(sketchRef)),
      actions: sortingActions,
    },
    mergeSort: {
      title: 'Merge Sort',
      sketch: sketch => sortingSketch(sketch, new MergeSort(sketchRef)),
      actions: sortingActions,
    },
  }

  /** Instance of p5.js */
  let instance
  useEffect(() => instance = new p5(sketch => sketches[props.sketch].sketch(sketch), sketchRef.current))

  const actions = {
    start: () => instance.loop(),
    pause: () => instance.noLoop(),
    reset: () => instance.reset(),
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