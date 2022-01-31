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

export default function RayCasting() {
  // Set constant values for sketch
  const constants = {
    obstacleLimit: 100,
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
          <Button id='reset' onClick={handleClick}>Reset</Button>
        </CardActions >
      </Card>
      <br />
      <Card sx={{ padding: '0px', flex: 1 }} ref={ref} />
    </>
  )
}