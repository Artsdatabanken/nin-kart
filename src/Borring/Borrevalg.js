import { withStyles } from '@material-ui/core/styles'
import SliderSetting from '../Tweaks/SliderSetting'
import Veksle from '../Tweaks/Veksle'
import AllOut from '@material-ui/icons/AllOut'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import {
  Card,
  CardActions,
  Typography,
  List,
  CardActionArea,
  CardContent,
  Button,
  CardMedia,
  withTheme,
} from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import config from '../config'

const styles = {
  card: {
    maxWidth: 408,
    height: '100%',
    backgroundColor: '#eee',
  },
  media: {
    width: 408,
    height: 280,
    //    height: 200,
    objectFit: 'cover',
  },
}

class Borrevalg extends Component {
  render() {
    const { classes } = this.props
    const color = 'rgba(240,240,240,1.0)'
    const bgColor = 'rgba(160,160,160,0.95)'
    return (
      <Card square={true} className={classes.card}>
        <CardMedia
          className={classes.media}
          image={config.getFotoOmslag('NA')}
          title="Bildebeskrivelse?"
        >
          <div
            style={{
              position: 'absolute',
              top: 210,
              height: 54,
              width: 376,
              backgroundColor: bgColor,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Typography style={{ color: color }} variant="title">
              Klikk i kart
            </Typography>
            <Typography style={{ color: color }} variant="body1">
              Valg
            </Typography>
          </div>
        </CardMedia>
        <CardActionArea style={{ backgroundColor: '#ccc' }} />
        <CardContent style={{ padding: 0, paddingTop: 24 }}>
          <List>
            <SliderSetting
              value={10}
              min={0}
              max={10000}
              step={100}
              tittel="Radius ved klikk"
              undertittel={(10).toFixed(0) + ' meter'}
              icon={<AllOut />}
              onChange={() => {}}
            />
            <Veksle
              tittel="Vis bare fra aktive kartlag"
              toggled={false}
              icon={<RemoveRedEye />}
              onClick={() => {}}
            />
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={this.handleClickOk}
          >
            OK
          </Button>
        </CardActions>
      </Card>
    )
  }

  handleClickOk = () => {
    const { history } = this.props
    history.goBack()
    //    history.push('/')
  }
}

export default withRouter(withTheme()(withStyles(styles)(Borrevalg)))
