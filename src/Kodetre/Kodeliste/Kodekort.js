import {
  Button,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Snackbar,
  withStyles,
} from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForward'
import React from 'react'
import { withRouter } from 'react-router'
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
  handleAktiver = () => {
    this.props.onToggleLayer(this.props.kode, true)
    this.setState({ leggerTil: true })
  }

  render() {
    const {
      kode,
      bbox,
      tittel,
      overordnet,
      onFitBounds,
      classes,
      erAktivert,
      onGoToCode,
    } = this.props
    return (
      <Card>
        <CardMedia
          style={{
            minHeight: 297,
            backgroundSize: 'cover',
          }}
          onClick={() => this.handleOpen()}
          image={backend.getFotoOmslag(kode)}
          onError={e => {
            const brokenImage = backend.getFotoOmslag('~')
            if (e.target.src !== brokenImage) e.target.src = brokenImage
          }}
          alt={'foto av' + tittel}
        />
        <Tittelblokk
          tittel={språk(tittel)}
          kode={kode}
          onGoToCode={onGoToCode}
          overordnet={overordnet}
        />
        <CardActions>
          {overordnet && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleAktiver}
              disabled={erAktivert}
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
        {this.state.leggerTil && (
          <Snackbar
            open={true}
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={() => {
              this.setState({ leggerTil: false })
            }}
            message={
              <span>
                Kartlag <b>{kode}</b> aktiveres
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => this.props.history.push('/')}
              >
                <ArrowForward />
              </IconButton>,
            ]}
          />
        )}
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
export default withRouter(withStyles(styles)(Kodekort))
