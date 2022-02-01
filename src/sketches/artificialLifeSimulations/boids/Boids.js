// MUI component imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import useSketch from '../../hook'
import sketch from './sketch'

export default function Boids() {
  const ref = useSketch(sketch)

  function handleClick(event) {
    const key = event.target.id
    ref.current?.sketch[key]()
    event.preventDefault()
  }

  return (
    <>
      <Card>
        <CardHeader title='Boids' />
        <CardContent>
          <Typography>Click 'START' to run the simulation, the boids will flock around the center of the canvas.</Typography>
          <Typography>Holding the mouse down will make the boids flock around the cursor.</Typography>
          <Typography>Holding SHIFT while releasing the mouse will add a static anchor for the boids.</Typography>
          <Typography>Pressing BACKSPACE will delete the anchor points in the reverse order to their addition.</Typography>
        </CardContent>
        <CardActions>
          <Button id='start' onClick={handleClick}>Start</Button>
          <Button id='pause' onClick={handleClick}>Pause</Button>
          <Button id='reset' onClick={handleClick}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}