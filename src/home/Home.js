// React imports
import React from 'react'
// Mui component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
// Mui icon imports
import SortIcon from '@mui/icons-material/Sort'

export default function Home() {

  return (
    <Card>
      <CardHeader title='Sketches' />
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar><SortIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sorting Algorithms" secondary="beta" />
          </ListItem>
        </List>
      </CardContent >
    </Card>
  )
}