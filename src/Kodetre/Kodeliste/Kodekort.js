import {
  Button,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Snackbar,
  withStyles,
} from '@material-ui/core'
import { LibraryAdd, ZoomOutMap } from '@material-ui/icons/'
import ArrowForward from '@material-ui/icons/ArrowForward'
import React from 'react'
import { withRouter } from 'react-router'
import backend from '../../backend'
import farger from '../../farger'
import språk from '../../språk'
import Tittelblokk from './Tittelblokk'

const styles = {
  pos: {
    marginBottom: 12,
  },
  iconSmall: {
    fontSize: 20,
    marginRight: 8,
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

  styles(prefix) {
    // HACK :(
    if (prefix === 'AO')
      return {
        minHeight: 297,
        marginTop: 142,
        marginBottom: 16,
        filter: 'drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.2)',
        backgroundSize: 'contain',
      }
    return {
      minHeight: 297,
      backgroundSize: 'cover',
    }
  }

  render() {
    const {
      kode,
      prefiks,
      bbox,
      tittel,
      nivå,
      overordnet,
      onFitBounds,
      classes,
      erAktivert,
      onGoToCode,
    } = this.props
    return (
      <Card square={true} style={{ backgroundColor: '#ccc' }}>
        <CardMedia
          style={this.styles(kode.substring(0, 2))}
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
          nivå={nivå}
          kode={kode}
          prefiks={prefiks}
          onGoToCode={onGoToCode}
          overordnet={overordnet}
        />
        <CardActions
          style={{
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {overordnet && (
            <Button
              style={{
                color: farger.medium[prefiks],
              }}
              variant="text"
              _color="primary"
              className={classes.button}
              onClick={this.handleAktiver}
              disabled={erAktivert}
            >
              <LibraryAdd className={classes.iconSmall} />
              Aktivér
            </Button>
          )}
          {bbox && (
            <Button
              style={{
                color: farger.medium[prefiks],
              }}
              variant="text"
              onClick={() => onFitBounds(bbox)}
            >
              <ZoomOutMap className={classes.iconSmall} />
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
                Aktiverer <b>{språk(tittel)}</b>
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
