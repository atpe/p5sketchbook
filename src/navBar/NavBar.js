// React imports
import React from 'react'
// React-Router-Dom imports
import { Link } from 'react-router-dom'
// Mui component imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
// Mui icon imports
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: '#fff',
            color: '#ed225d',
            textDecoration: 'none'
          }}
          component='a'
          href='https://p5js.org/'
        >p5</Avatar>
        <Typography variant='h5' component='div' sx={{ flex: 1 }}>SketchBook</Typography>
        <Button color='secondary' LinkComponent={Link} to='/'>Home</Button>
        <Avatar sx={{ ml: 2 }} alt='Adam Evans'>AE</Avatar>
      </Toolbar>
    </AppBar >
  )
}