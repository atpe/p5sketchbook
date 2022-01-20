// Path finding algorithms imports
import AStarSearch from './pathFindingAlgorithms/aStarSearch/AStarSearch'
// Graphics rendering algorithms imports
import RayCasting from './graphicsRenderingAlgorithms/rayCasting/RayCasting'
// Data structure algorithms imports
import Quadtree from './dataStructureAlgorithms/quadtree/Quadtree'
// Fractal geometry imports
import MandlebrotSet from './fractalGeometries/mandlebrotSet/MandlebrotSet'
import JuliaSet from './fractalGeometries/juliaSet/JuliaSet'
import SierpinskiCarpet from './fractalGeometries/sierpinskiCarpet/SierpinskiCarpet'
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
      {
        title: 'A* Search',
        route: 'a-star-search',
        element: AStarSearch,
      },
    ],
  }, {
    title: 'Graphics Rendering Algorithms',
    route: 'game-rendering-algorithms',
    sketches: [
      {
        title: 'Ray Casting',
        route: 'ray-casting',
        element: RayCasting,
      },
    ],
  }, {
    title: 'Data Structure Algorithms',
    route: 'data-structure-algorithms',
    sketches: [
      {
        title: 'Quadtree',
        route: 'quadtree',
        element: Quadtree,
      },
    ],
  }, {
    title: 'Fractal Geometries',
    route: 'fractal-geometries',
    sketches: [
      {
        title: 'Mandlebrot Set',
        route: 'mandlebrot-set',
        element: MandlebrotSet,
      }, {
        title: 'Julia Set',
        route: 'julia-set',
        element: JuliaSet,
      }, {
        title: 'Sierpiński Carpet',
        route: 'sierpinski-carpet',
        element: SierpinskiCarpet,
      },
    ],
  }, {
    title: 'Sorting Algorithms',
    route: 'sorting-algorithms',
    sketches: [
      {
        title: 'Selection Sort',
        route: 'selection-sort',
        element: SelectionSort,
      }, {
        title: 'Insertion Sort',
        route: 'insertion-sort',
        element: InsertionSort,
      }, {
        title: 'Bubble Sort',
        route: 'bubble-sort',
        element: BubbleSort,
      }, {
        title: 'Merge Sort',
        route: 'merge-sort',
        element: MergeSort,
      }, {
        title: 'Heap Sort',
        route: 'heap-sort',
        element: HeapSort,
      },
    ],
  },
]