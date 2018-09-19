import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  Typography,
  CardActionArea,
  CardContent,
  Button,
  CardMedia,
  withTheme,
} from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Borring from './Borring'
import FlatUt from './FlatUt'
import Sted from './Sted'

const styles = {
  card: {
    maxWidth: 408,
  },
  media: {
    width: 408,
    height: 280,
    //    height: 200,
    objectFit: 'cover',
  },
}

class BorreVindu extends Component {
  render() {
    const { lat, lng, barn, classes, history } = this.props
    if (!barn) return null
    const { AO, geom_id, prefix, ...andreBarn } = barn
    const color = 'rgba(240,240,240,1.0)'
    const bgColor = 'rgba(120,120,120,1.0)'
    const dominantKode = 'NA_T4'
    return (
      <Card square={true} className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Fomslag%2F408%2F${dominantKode}.jpg?alt=media`}
            title="Bildebeskrivelse?"
          >
            {true && (
              <div
                style={{
                  position: 'absolute',
                  top: 190,
                  height: 74,
                  width: 376,
                  backgroundColor: 'rgba(160,160,160,0.95)',
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                {AO && (
                  <FlatUt node={AO}>
                    <Sted />
                  </FlatUt>
                )}
                <Typography style={{ color: color }} variant="body1">
                  {parseFloat(lat).toFixed(5)}° N {parseFloat(lng).toFixed(5)}°
                  Ø
                </Typography>
              </div>
            )}
          </CardMedia>
          {false && <CardContent style={{ backgroundColor: bgColor }} />}
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              if (geom_id) history.push(`/detaljer/${prefix}/${geom_id}`)
            }}
          >
            Kilder
          </Button>
          <Button size="small" color="primary">
            Valg
          </Button>
        </CardActions>
        <Borring barn={andreBarn} />
      </Card>
    )
  }
}

export default withRouter(withTheme()(withStyles(styles)(BorreVindu)))
