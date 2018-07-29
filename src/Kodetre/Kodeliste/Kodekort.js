import { Card, CardMedia } from '@material-ui/core'
import React from 'react'
import backend from '../../backend'
import språk from '../../språk'
import Tittelblokk from './Tittelblokk'

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

  componentWillReceiveProps(nextProps, props) {
    if (nextProps.data && props.data && nextProps.data.kode !== props.data.kode)
      this.setState({ favorite: this.isFavorite(nextProps.data.kode) })
  }

  render() {
    const { kode } = this.props
    return (
      <Card containerStyle={{ padding: 0 }}>
        <CardMedia
          overlay={'abc'}
          style={{
            height: 297,
            minHeight: 297,
            maxHeight: 297,
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
          onToggleLayer={(event, state) =>
            this.props.onToggleLayer(kode, state)
          }
          isActiveLayer={this.props.isActiveLayer}
          overordnet={this.props.overordnet}
        />
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
export default Kodekort
