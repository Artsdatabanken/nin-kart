import React from 'react'
import {
  FloatingActionButton,
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle,
  List,
  ListItem,
  Subheader,
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { IconButton } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Star from 'material-ui/svg-icons/toggle/star'
import Share from 'material-ui/svg-icons/social/share'
import muiThemeable from 'material-ui/styles/muiThemeable'

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
    return (
      <Card containerStyle={{ paddingBottom: 0 }}>
        <CardMedia
          overlay2={
            <CardTitle title="Overlay title" subtitle="Overlay subtitle" />
          }
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
            src={selv.foto}
            alt=""
            style={{ height: 350, objectFit: 'cover' }}
          />
        </CardMedia>
        <List>
          <Subheader>Beskrivelse</Subheader>
          <ListItem primaryText={data.ingress} />
        </List>
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
    style={{
      xbackgroundColor: muiTheme.palette.accent2Color,
    }}
    title={data.navn}
    titleColor={muiTheme.palette.alternateTextColor}
    subtitle={
      <div onClick={() => onGoToCode(data.forelder.kode)}>
        {data.forelder ? data.forelder.navn : ''}
      </div>
    }
    subtitleStyle={{ cursor: 'pointer' }}
    subtitleColor={muiTheme.palette.alternateTextColor}
  >
    {false && (
      <FloatingActionButton
        style={{
          position: 'absolute',
          left: 340,
          top: -26,
        }}
        onClick={() => onAddLayer(data.navn, data.kode)}
      >
        <ContentAdd />
      </FloatingActionButton>
    )}

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
