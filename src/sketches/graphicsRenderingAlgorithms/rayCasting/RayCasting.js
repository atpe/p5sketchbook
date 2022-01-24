// React imports
import { createRef, useEffect } from 'react'
// P5 library imports
import p5 from 'p5'
// MUI component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import sketch from './sketch'

export default function RayCasting() {
  // Create a reference for the target DOM element
  const ref = createRef()
  // Set constant values for sketch
  const constants = {
    obstacleLimit: 100,
  }
  // Attach p5 canvas instance to reference on component mount
  useEffect(() => {
    ref.current.sketch = new p5(s => sketch(s, ref), ref.current)
    ref.current = { ...ref.current, ...constants }
    return () => ref.current.sketch = null
  })

  return (
    <>
      <Card>
        <CardHeader title='Ray Casting' />
        <CardContent>
          <Typography>
            Use the W, A, S, and D keys to move the caster around to see how its rays interact with the boundaries.
          </Typography>
          <Typography>
            Click the mouse to insert an obstacle. (Limited to {constants.obstacleLimit}).
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