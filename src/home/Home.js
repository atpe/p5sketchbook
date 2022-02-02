// React imports
import React from 'react'
// React-Router-Dom imports
import { Link } from 'react-router-dom'
// Mui component imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
// Local imports
import { index } from '../sketches/index'
import PhonelinkEraseOutlinedIcon from '@mui/icons-material/PhonelinkEraseOutlined'
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly'

export default function Home() {
  return index.map((category, i) =>
    <div key={`list-subheader-${i}`}>
      <Card sx={{ maxWidth: '800px' }}>
        <CardHeader title={category.title} titleTypographyProps={{ color: 'secondary' }} />
        <CardContent component={List} dense sx={{ padding: 0 }}>
          { // Iterate over sketches in that category
            category.sketches.map((sketch, j) =>
              <ListItemButton key={`list-item-${j}`} component={Link} to={`/${category.route}/${sketch.route}`}>
                <ListItemText primary={sketch.title} />
                {
                  sketch.requires.keyboard ? <PhonelinkEraseOutlinedIcon color='secondary' /> :
                    !sketch.requires.screen ? <MobileFriendlyIcon color='secondary' /> : null
                }
              </ListItemButton>
            )
          }
        </CardContent>
      </Card>
      <br />
    </div>
  )
}
