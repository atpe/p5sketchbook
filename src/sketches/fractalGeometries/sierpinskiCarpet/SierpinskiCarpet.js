// React imports
import { createRef, useEffect } from 'react'
// P5 library imports
import p5 from 'p5'
// MUI component imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import sketch from './sketch'

export default function SierpinskiCarpet() {
  // Create a reference for the target DOM element
  const ref = createRef()
  // Attach p5 canvas instance to reference on component mount
  useEffect(() => {
    ref.current.sketch = new p5(s => sketch(s, ref), ref.current)
    return () => ref.current.sketch = null
  })

  return (
    <>
      <Card>
        <CardContent>
          <Typography>
            Click the canvas to add another iteration to the carpet (May take longer at higher iterations).
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.reset() }}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}