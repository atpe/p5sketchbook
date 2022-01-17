/**
 * @module Sketch
 * @author Adam Evans
 */

// React imports
import React, { createRef, useEffect } from 'react'
// P5 library imports
import p5 from 'p5'
// MUI component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
// Sketch imports
import { sortingSketch, sortingActions } from './sortingAlgorithms/main'
import { rayCastingSketch, rayCastingActions } from './rayCasting/main'
import { quadtreeSketch, quadtreeActions } from './quadtree/main'
import { aStarSearchSketch, aStarSearchActions } from './aStarSearch/main'
import { mandlebrotSetSketch, mandlebrotSetActions } from './mandlebrotSet/main'
import { juliaSetSketch, juliaSetActions } from './juliaSet/main'
import { sierpinskiCarpetSketch, sierpinskiCarpetActions } from './sierpinskiCarpet/main'
// import { mandlebrotSetShaderSketch, mandlebrotSetShaderActions } from './mandlebrotSetShader/main'
// Sorting algorithm imports
import SelectionSort from './sortingAlgorithms/algorithms/selectionSort'
import InsertionSort from './sortingAlgorithms/algorithms/insertionSort'
import BubbleSort from './sortingAlgorithms/algorithms/bubbleSort'
import MergeSort from './sortingAlgorithms/algorithms/mergeSort'
import HeapSort from './sortingAlgorithms/algorithms/heapSort'


/**
 * Render sketch
 * 
 * @default
 * @returns {React.Component} Sketch component
 */
export default function Sketch(props) {
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
    heapSort: {
      title: 'Heap Sort',
      sketch: sketch => sortingSketch(sketch, new HeapSort(sketchRef)),
      actions: sortingActions,
    },
    rayCasting: {
      title: 'Ray Casting',
      sketch: sketch => rayCastingSketch(sketch, sketchRef),
      actions: rayCastingActions,
    },
    quadtree: {
      title: 'Quadtree',
      sketch: sketch => quadtreeSketch(sketch, sketchRef),
      actions: quadtreeActions,
    },
    aStarSearch: {
      title: 'A* Search',
      sketch: sketch => aStarSearchSketch(sketch, sketchRef),
      actions: aStarSearchActions,
    },
    mandlebrotSet: {
      title: 'Mandlebrot Set',
      sketch: sketch => mandlebrotSetSketch(sketch, sketchRef),
      actions: mandlebrotSetActions,
    },
    juliaSet: {
      title: 'Julia Set',
      sketch: sketch => juliaSetSketch(sketch, sketchRef),
      actions: juliaSetActions,
    },
    sierpinskiCarpet: {
      title: 'Sierpiński Carpet',
      sketch: sketch => sierpinskiCarpetSketch(sketch, sketchRef),
      actions: sierpinskiCarpetActions,
    },
    // mandlebrotSetShader: {
    //   title: 'Mandlebrot Set (Shader)',
    //   sketch: sketch => mandlebrotSetShaderSketch(sketch, sketchRef),
    //   actions: mandlebrotSetShaderActions,
    // },
  }

  let instance
  useEffect(() => instance = new p5(sketch => sketches[props.sketch].sketch(sketch), sketchRef.current))

  const actions = {
    start: () => instance.start(),
    pause: () => instance.pause(),
    reset: () => instance.reset(),
  }

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