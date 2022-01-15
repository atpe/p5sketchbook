/**
 * @module Home
 * @author Adam Evans
 */

// React imports
import React from 'react'
// React-Router-Dom imports
import { Link } from 'react-router-dom'
// Mui component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

/**
 * Render homepage
 * 
 * @default
 * @returns {React.Component} Homepage component
 */
export default function Home() {
  return (
    <Card>
      <CardHeader title='Sketches' />
      <CardContent component={List}>
        <ListSubheader>Game and Graphics Algorithms</ListSubheader>
        <ListItemButton component={Link} to='/game-and-graphics/ray-casting'>
          <ListItemText primary='Ray Casting' />
        </ListItemButton>
        <ListItemButton component={Link} to='/game-and-graphics/quadtree'>
          <ListItemText primary='Quadtree' />
        </ListItemButton>
        <ListSubheader>Mathematical Sets</ListSubheader>
        <ListItemButton component={Link} to='/mathematical-sets/mandlebrot-set'>
          <ListItemText primary='Mandlebrot Set' />
        </ListItemButton>
        <ListSubheader>Sorting Algorithms</ListSubheader>
        <ListItemButton component={Link} to='/sorting-algorithms/selection-sort'>
          <ListItemText primary='Selection Sort' />
        </ListItemButton>
        <ListItemButton component={Link} to='/sorting-algorithms/insertion-sort'>
          <ListItemText primary='Insertion Sort' />
        </ListItemButton>
        <ListItemButton component={Link} to='/sorting-algorithms/bubble-sort'>
          <ListItemText primary='Bubble Sort' />
        </ListItemButton>
        <ListItemButton component={Link} to='/sorting-algorithms/merge-sort'>
          <ListItemText primary='Merge Sort' />
        </ListItemButton>
        <ListItemButton component={Link} to='/sorting-algorithms/heap-sort'>
          <ListItemText primary='Heap Sort' />
        </ListItemButton>
      </CardContent >
    </Card>
  )
}