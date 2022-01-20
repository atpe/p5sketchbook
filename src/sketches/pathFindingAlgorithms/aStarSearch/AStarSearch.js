// React imports
import { createRef, useEffect } from 'react'
// P5 library imports
import p5 from 'p5'
// MUI component imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// Local component imports
import sketch from './sketch'

export default function AStarSearch() {
  // Create a reference for the target DOM element
  const ref = createRef()
  // Attach p5 canvas instance to reference on component mount
  useEffect(() => { ref.current.sketch = new p5(s => sketch(s, ref), ref.current) })

  return (
    <>
      <Card>
        <CardContent>
          <Typography>Click on the canvas to select the start point for the path.</Typography>
          <Typography>Click on the canvas, whilst holding SHIFT, to select the end point.</Typography>
          <Typography>When both have been selected, click START to run the algorithm.</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.start() }}>Start</Button>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.pause() }}>Pause</Button>
          <Button onClick={(e) => { e.preventDefault(); ref.current?.sketch.reset() }}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}