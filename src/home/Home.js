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
        <ListSubheader>Ray Casting</ListSubheader>
        <ListItemButton component={Link} to='/ray-casting/2d'>
          <ListItemText primary='2D Ray Casting' />
        </ListItemButton>
      </CardContent >
    </Card>
  )
}