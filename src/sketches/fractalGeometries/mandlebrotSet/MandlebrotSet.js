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

export default function MandlebrotSet() {
  const ref = useSketch(sketch)

  return (
    <>
      <Card>
        <CardHeader title='Mandlebrot Set' />
        <CardContent>
          <Typography>
            Click 'START' to iterate.
          </Typography>
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