import { Card, CardMedia } from 'material-ui'
import React from 'react'
import backend from '../../backend'
import språk from '../../språk'
import BildeDialog from './BildeDialog'
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

  toggleFavorite = kode => {
    let favs = JSON.parse(localStorage.getItem('favorite') || '[]')
    if (this.state.favorite) favs = favs.filter(x => x !== kode)
    else favs.push(kode)
    localStorage.setItem('favorite', JSON.stringify(favs))
    this.setState({ favorite: !this.state.favorite })
  }

  getFavorites = () => JSON.parse(localStorage.getItem('favorite') || '[]')
  isFavorite = kode => this.getFavorites().indexOf(kode) >= 0

  render() {
    const { kode } = this.props
    const srcSet = `${backend.getFotoOmslag(
      kode,
      612
    )} 1.5x, ${backend.getFotoOmslag(kode, 816)} 2x`
    return (
      <Card containerStyle={{ paddingBottom: 0 }}>
        <CardMedia overlay={null} style={{ height: 297, maxHeight: 297 }}>
          <img
            onClick={() => this.handleOpen()}
            src={backend.getFotoOmslag(kode)}
            srcSet={srcSet}
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
          <BildeDialog
            kode={kode}
            tittel={språk(this.props.tittel)}
            visBilde={this.state.visBilde}
            handleClose={this.handleClose}
          />
        </CardMedia>
        <Tittelblokk
          tittel={språk(this.props.tittel)}
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

export default Kodekort
