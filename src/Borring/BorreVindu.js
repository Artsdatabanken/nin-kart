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
import Kilde from '../Kilde'
import backend from '../backend'

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

class BorreVindu extends Component {
  render() {
    const { lat, lng, barn, view, classes } = this.props
    if (!barn) return null
    const { AO, geom_id, prefix, ...andreBarn } = barn
    const color = 'rgba(240,240,240,1.0)'
    const bgColor = 'rgba(160,160,160,0.95)'
    const dominantKode = this.finnButikkKode()
    console.log('dom', dominantKode)
    return (
      <Card square={true} className={classes.card}>
        <CardMedia
          className={classes.media}
          image={backend.getFotoOmslag(dominantKode)}
          title="Bildebeskrivelse?"
        >
          <div
            style={{
              position: 'absolute',
              top: 190,
              height: 74,
              width: 376,
              backgroundColor: bgColor,
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
              {parseFloat(lat).toFixed(5)}° N {parseFloat(lng).toFixed(5)}° Ø
            </Typography>
          </div>
        </CardMedia>
        <CardActionArea style={{ backgroundColor: '#ccc' }} />
        <CardActions>
          {view ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.handleClickKunnskap}
            >
              Kunnskap
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.handleClickKilder}
            >
              Kilder
            </Button>
          )}
          <Button size="small" color="primary">
            Valg
          </Button>
        </CardActions>
        <CardContent style={{ padding: 0 }}>
          {view ? (
            <Kilde geom_id={this.finnGeomId()} prefiks="NA" />
          ) : (
            <Borring barn={andreBarn} />
          )}
        </CardContent>
      </Card>
    )
  }

  finnKodeHack(barn) {
    if (!barn.barn) return null
    console.log('baba', barn)
    for (let key of Object.keys(barn.barn)) {
      const node = barn.barn[key]
      const kode = this.finnKodeHack(node)
      if (kode) return kode
      if (node.kode) return node.kode
    }
    return 'NA'
  }

  finnButikkKode() {
    const { barn } = this.props
    if (!barn.NA) return 'MI_KA'
    const nabarn = barn.NA.barn
    if (!nabarn) return 'MI_KA'
    return this.finnKodeHack(barn.NA)
  }

  finnGeomHack(barn) {
    if (barn.geom_id) return barn.geom_id
    if (!barn.barn) return null
    for (let key of Object.keys(barn.barn)) {
      const node = barn.barn[key]
      const geom_id = this.finnGeomHack(node)
      if (geom_id) return geom_id
    }
  }

  finnGeomId() {
    const { barn } = this.props
    if (!barn) return
    if (!barn.NA) return
    return this.finnGeomHack(barn.NA)
  }

  handleClickKunnskap = () => {
    const { lat, lng, history } = this.props
    history.push(`/punkt/${lng},${lat}`)
  }
  handleClickKilder = () => {
    const { lat, lng, history } = this.props
    history.push(`/punkt/${lng},${lat}/kilde`)
  }
}

export default withRouter(withTheme()(withStyles(styles)(BorreVindu)))
