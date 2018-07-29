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
    const srcSet = `${backend.getFotoOmslag(
      kode,
      612
    )} 1.5x, ${backend.getFotoOmslag(kode, 816)} 2x`
    return (
      <Card containerStyle={{ padding: 0 }}>
        <CardMedia
          overlay={null}
          style={{ height: 297, maxHeight: 297 }}
          onClick={() => this.handleOpen()}
          image={backend.getFotoOmslag(kode)}
          onError={e => {
            const brokenImage = backend.getFotoOmslag('~')
            if (e.target.src !== brokenImage) e.target.src = brokenImage
          }}
          alt=""
          style={{
            minHeight: 297,
            height: 297,
            maxHeight: 297,
            objectFit: 'cover',
          }}
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
