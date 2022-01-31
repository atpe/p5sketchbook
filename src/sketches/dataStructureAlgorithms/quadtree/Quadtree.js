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

export default function Quadtree() {
  // Set constant values for sketch
  const constants = {
    pointLimit: 1000,
    multPoints: 100,
  }

  const ref = useSketch(sketch, constants)

  function handleClick(event) {
    const key = event.target.id
    ref.current?.sketch[key]()
    event.preventDefault()
  }

  return (
    <>
      <Card>
        <CardHeader title='Quadtree' />
        <CardContent>
          <Typography>
            Use the W, A, S, and D keys to move the query box.
          </Typography>
          <Typography>
            Click the mouse in the top half of the sketch to insert a point at that position.
          </Typography>
          <Typography>
            Hold SHIFT and click to add {constants.multPoints} random points (Limited to {constants.pointLimit}).
          </Typography>
        </CardContent>
        <CardActions>
          <Button id='reset' onClick={handleClick}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}