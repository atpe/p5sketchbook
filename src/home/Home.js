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
import ListItemIcon from '@mui/material/ListItemIcon'
// Mui icon imports
import SortIcon from '@mui/icons-material/Sort'

export default function Home() {

  return (
    <Card>
      <CardHeader title='Sketches' />
      <CardContent component={List}>
        <ListSubheader>Sorting Algorithms</ListSubheader>
        <ListItemButton component={Link} to='/selectionSort'>
          <ListItemText primary='Selection Sort' />
        </ListItemButton>
        <ListItemButton component={Link} to='/insertionSort'>
          <ListItemText primary='Insertion Sort' secondary='beta' />
        </ListItemButton>
      </CardContent >
    </Card>
  )
}