// React-router imports
import { Route } from 'react-router-dom'
// Local component imports
import Sketch from '../Sketch'

export default function SortingAlgorithmsRouter() {
  return (
    <Route path='sorting-algorithms'>
      <Route path='selection-sort' element={<Sketch sketch='selectionSort' />} />
      <Route path='insertion-sort' element={<Sketch sketch='insertionSort' />} />
      <Route path='bubble-sort' element={<Sketch sketch='bubbleSort' />} />
    </Route>
  )
}