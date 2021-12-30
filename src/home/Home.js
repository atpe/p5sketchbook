// React imports
import React from 'react'
// React-Router-Dom imports
import { Link } from 'react-router-dom'
// Mui component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
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
        <ListItemButton component={Link} to='/sorting'>
          <ListItemIcon>
            <SortIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Sorting Algorithms' secondary='beta' />
        </ListItemButton>
      </CardContent >
    </Card>
  )
}