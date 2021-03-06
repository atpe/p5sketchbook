// Path finding algorithms imports
import AStarSearch from './pathFindingAlgorithms/aStarSearch/AStarSearch'
// Artificial life simulation imports
import ElementaryCellularAutomata from './artificialLifeSimulations/elementaryCellularAutomata/ElementaryCellularAutomata'
import GameOfLife from './artificialLifeSimulations/gameOfLife/GameOfLife'
import Boids from './artificialLifeSimulations/boids/Boids'
// Graphics rendering algorithms imports
import RayCasting from './graphicsRenderingAlgorithms/rayCasting/RayCasting'
// Data structure algorithms imports
import Quadtree from './dataStructureAlgorithms/quadtree/Quadtree'
// Fractal geometry imports
import MandlebrotSet from './fractalGeometries/mandlebrotSet/MandlebrotSet'
import JuliaSet from './fractalGeometries/juliaSet/JuliaSet'
import SierpinskiCarpet from './fractalGeometries/sierpinskiCarpet/SierpinskiCarpet'
import CantorSet from './fractalGeometries/cantorSet/CantorSet'
// Sorting algorithms imports
import SelectionSort from './sortingAlgorithms/selectionSort/SelectionSort'
import InsertionSort from './sortingAlgorithms/insertionSort/InsertionSort'
import BubbleSort from './sortingAlgorithms/bubbleSort/BubbleSort'
import HeapSort from './sortingAlgorithms/heapSort/HeapSort'
import MergeSort from './sortingAlgorithms/mergeSort/MergeSort'

export const index = [
  {
    title: 'Path Finding Algorithms',
    route: 'path-finding-algorithms',
    sketches: [
      { title: 'A* Search', route: 'a-star-search', element: AStarSearch, requires: { keyboard: true, screen: true } },
    ],
  }, {
    title: 'Artificial Life Simulations',
    route: 'artificial-life-simulations',
    sketches: [
      { title: 'Elementary Cellular Automata', route: 'elementary-cellular-automata', element: ElementaryCellularAutomata, requires: { keyboard: true, screen: false } },
      { title: "Conway's Game of Life", route: 'game-of-life', element: GameOfLife, requires: { keyboard: false, screen: false } },
      { title: 'Boids', route: 'boids', element: Boids, requires: { keyboard: true, screen: true } },
    ],
  }, {
    title: 'Computer Graphics Algorithms',
    route: 'computer-graphics-algorithms',
    sketches: [
      { title: 'Ray Casting', route: 'ray-casting', element: RayCasting, requires: { keyboard: true, screen: false } },
    ],
  }, {
    title: 'Data Structure Algorithms',
    route: 'data-structure-algorithms',
    sketches: [
      { title: 'Quadtree', route: 'quadtree', element: Quadtree, requires: { keyboard: true, screen: false } },
    ],
  }, {
    title: 'Fractal Geometries',
    route: 'fractal-geometries',
    sketches: [
      { title: 'Mandlebrot Set', route: 'mandlebrot-set', element: MandlebrotSet, requires: { keyboard: false, screen: false } },
      { title: 'Julia Set', route: 'julia-set', element: JuliaSet, requires: { keyboard: true, screen: false } },
      { title: 'Sierpi??ski Carpet', route: 'sierpinski-carpet', element: SierpinskiCarpet, requires: { keyboard: false, screen: false } },
      { title: 'Cantor Set', route: 'cantor-set', element: CantorSet, requires: { keyboard: false, screen: false } },
    ],
  }, {
    title: 'Sorting Algorithms',
    route: 'sorting-algorithms',
    sketches: [
      { title: 'Selection Sort', route: 'selection-sort', element: SelectionSort, requires: { keyboard: false, screen: false } },
      { title: 'Insertion Sort', route: 'insertion-sort', element: InsertionSort, requires: { keyboard: false, screen: false } },
      { title: 'Bubble Sort', route: 'bubble-sort', element: BubbleSort, requires: { keyboard: false, screen: false } },
      { title: 'Merge Sort', route: 'merge-sort', element: MergeSort, requires: { keyboard: false, screen: false } },
      { title: 'Heap Sort', route: 'heap-sort', element: HeapSort, requires: { keyboard: false, screen: false } },
    ],
  },
]