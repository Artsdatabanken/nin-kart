import React from 'react'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui'
import { IconButton } from 'material-ui'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Star from 'material-ui/svg-icons/toggle/star'
import Plus from 'material-ui/svg-icons/image/control-point'
import Share from 'material-ui/svg-icons/social/share'
import muiThemeable from 'material-ui/styles/muiThemeable'
import backend from '../../backend'
import språk from '../../språk'

class Kodekort extends React.Component {
  state = { expanded: false }

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
    const { kode, muiTheme } = this.props
    const srcSet = `${backend.getFotoOmslag(
      kode,
      612
    )} 1.5x, ${backend.getFotoOmslag(kode, 816)} 2x`
    return (
      <Card containerStyle={{ paddingBottom: 0 }}>
        <CardMedia
          overlay={
            <Tittelblokk
              favorite={this.state.favorite}
              muiTheme={muiTheme}
              onGoToCode={this.props.onGoToCode}
              onAddLayer={this.props.onAddLayer}
              toggleFavorite={this.toggleFavorite}
              onAddSelected={this.props.onAddSelected}
              nodeMeta={{
                farge: this.props.farge,
                kode: this.props.kode,
                sti: this.props.sti,
                tittel: this.props.tittel,
              }}
              kode={this.props.kode}
              infoUrl={this.props.infoUrl}
              tittel={språk(this.props.tittel)}
              overordnet={this.props.overordnet}
            />
          }
          style={{ height: 297, maxHeight: 297 }}
        >
          <img
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
        </CardMedia>
      </Card>
    )
  }
}

const Tittelblokk = ({
  onGoToCode,
  onAddLayer,
  toggleFavorite,
  onAddSelected,
  favorite,
  kode,
  nodeMeta,
  infoUrl,
  tittel,
  overordnet,
  muiTheme,
}) => (
  <CardTitle
    actAsExpander={true}
    showExpandableButton={true}
    title={tittel}
    titleColor={muiTheme.palette.alternateTextColor}
    subtitle={
      overordnet &&
      overordnet.map(forelder => (
        <div key={forelder.kode} onClick={() => onGoToCode(forelder.sti)}>
          {språk(forelder.tittel)}
        </div>
      ))
    }
    subtitleStyle={{ cursor: 'pointer' }}
    subtitleColor={muiTheme.palette.alternateTextColor}
  >
    <CardActions
      style={{
        position: 'absolute',
        bottom: -8,
        right: 0,
      }}
    >
      <IconButton title={'Del'} style={{ float: 'right' }}>
        <Share color="#eee" />
      </IconButton>
      <IconButton
        title={'Merk som favoritt'}
        style={{ float: 'right' }}
        onClick={() => toggleFavorite(kode)}
      >
        {favorite ? <Star color="#eee" /> : <StarBorder color="#eee" />}
      </IconButton>
      <IconButton
        style={{ float: 'right' }}
        onClick={() => onAddSelected(nodeMeta)}
        title={'Velg'}
      >
        <Plus color="#eee" />
      </IconButton>
    </CardActions>
  </CardTitle>
)

export default muiThemeable()(Kodekort)
