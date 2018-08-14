import {
  Button,
  Card,
  CardActions,
  CardMedia,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import backend from '../../backend'
import språk from '../../språk'
import Tittelblokk from './Tittelblokk'

const styles = {
  pos: {
    marginBottom: 12,
  },
}

class Kodekort extends React.Component {
  state = {
    visBilde: false,
  }

  handleClose = () => {
    this.setState({ visBilde: false })
  }
  handleOpen = () => {
    this.setState({ visBilde: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.data &&
      prevProps.data &&
      this.props.data.kode !== prevProps.data.kode
    )
      this.setState({ favorite: this.isFavorite(this.props.data.kode) })
  }

  render() {
    const {
      kode,
      bbox,
      overordnet,
      onFitBounds,
      classes,
      isActiveLayer,
    } = this.props
    return (
      <Card>
        <CardMedia
          style={{
            minHeight: 297,
          }}
          onClick={() => this.handleOpen()}
          image={backend.getFotoOmslag(kode)}
          onError={e => {
            const brokenImage = backend.getFotoOmslag('~')
            if (e.target.src !== brokenImage) e.target.src = brokenImage
          }}
          alt=""
        />
        <Tittelblokk
          tittel={språk(this.props.tittel)}
          kode={this.props.kode}
          onGoToCode={this.props.onGoToCode}
          overordnet={overordnet}
        />
        <CardActions>
          {overordnet && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.props.onToggleLayer(kode, true)}
              disabled={isActiveLayer}
            >
              Aktivér
            </Button>
          )}
          {bbox && (
            <Button variant="text" onClick={() => onFitBounds(bbox)}>
              Zoom til
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

/*
          <BildeDialog
            kode={kode}
            tittel={språk(this.props.tittel)}
            visBilde={this.state.visBilde}
            handleClose={this.handleClose}
          />

*/
export default withStyles(styles)(Kodekort)
