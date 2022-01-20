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
// Local imports
import { index } from '../sketches/index'

export default function Home() {
  return (
    <Card sx={{ overflow: 'auto' }}>
      <CardHeader title='Sketches' />
      <CardContent component={List} dense sx={{ padding: 0 }}>
        { // Iterate over categories in the index
          index.map((category, i) =>
            < div key={`list-subheader-${i}`}>
              <ListSubheader>{category.title}</ListSubheader>
              { // Iterate over sketches in that category
                category.sketches.map((sketch, j) =>
                  <ListItemButton key={`list-item-${j}`} component={Link} to={`/${category.route}/${sketch.route}`}>
                    <ListItemText primary={sketch.title} />
                  </ListItemButton>
                )
              }
            </div>
          )
        }
      </CardContent >
    </Card >
  )
}