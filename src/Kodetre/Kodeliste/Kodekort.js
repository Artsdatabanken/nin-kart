import React from 'react'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui'
import { IconButton } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Star from 'material-ui/svg-icons/toggle/star'
import Share from 'material-ui/svg-icons/social/share'
import muiThemeable from 'material-ui/styles/muiThemeable'
import backend from '../../backend'

class Kodekort extends React.Component {
  state = { expanded: false }

  componentWillReceiveProps(nextProps, props) {
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
    const { data, muiTheme } = this.props
    const selv = this.props.selv || {}
    const foto = selv.foto ? selv.foto : backend.getKodeFotoUrl(this.props.kode)
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
              selv={selv}
              data={data}
            />
          }
        >
          <img
            src={foto}
            alt=""
            style={{ minHeight: 144, objectFit: 'cover' }}
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
  favorite,
  data,
  selv,
  muiTheme,
}) => (
  <CardTitle
    actAsExpander={true}
    showExpandableButton={true}
    title={
      data.navn || (
        <a href="https://jira.artsdatabanken.no/browse/EG-138">JIRA EG-138</a>
      )
    }
    titleColor={muiTheme.palette.alternateTextColor}
    subtitle={
      <div onClick={() => onGoToCode(data.forelder.kode)}>
        {data.forelder ? data.forelder.navn : ''}
      </div>
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
      <IconButton
        href={selv.infoUrl}
        style={{
          float: 'right',
        }}
      >
        <InfoOutline color="#eee" />
      </IconButton>
      <IconButton style={{ float: 'right' }}>
        <Share color="#eee" />
      </IconButton>
      <IconButton
        style={{ float: 'right' }}
        onClick={() => toggleFavorite(data.kode)}
      >
        {favorite ? <Star color="#eee" /> : <StarBorder color="#eee" />}
      </IconButton>
    </CardActions>
  </CardTitle>
)

export default muiThemeable()(Kodekort)
