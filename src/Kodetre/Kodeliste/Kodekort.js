import React from 'react'
import {
  FloatingActionButton,
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { IconButton } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Star from 'material-ui/svg-icons/toggle/star'
import Share from 'material-ui/svg-icons/social/share'
import muiThemeable from 'material-ui/styles/muiThemeable'

class Kodekort extends React.Component {
  state = {}

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
        <CardMedia>
          <img
            src={selv.media}
            alt=""
            style={{ maxHeight: 500, objectFit: 'cover' }}
          />
        </CardMedia>
        <CardTitle
          style={{
            backgroundColor: muiTheme.palette.accent2Color,
          }}
          title={data.navn}
          titleColor={muiTheme.palette.alternateTextColor}
          subtitle={
            <div onClick={() => this.props.onGoToCode(data.forelder.kode)}>
              {data.forelder ? data.forelder.navn : ''}
            </div>
          }
          subtitleStyle={{ textDecoration: 'underline', cursor: 'pointer' }}
          subtitleColor={muiTheme.palette.alternateTextColor}
        >
          <FloatingActionButton
            style={{
              position: 'absolute',
              left: 340,
              top: -26,
            }}
            onClick={() => this.props.onAddLayer(data.navn, data.kode)}
          >
            <ContentAdd />
          </FloatingActionButton>

          <CardActions
            style={{
              position: 'absolute',
              bottom: -10,
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
              onClick={() => this.toggleFavorite(data.kode)}
            >
              {this.state.favorite ? (
                <Star color="#eee" />
              ) : (
                <StarBorder color="#eee" />
              )}
            </IconButton>
          </CardActions>
        </CardTitle>
        {false && <CardText>{selv.beskrivelse}</CardText>}
      </Card>
    )
  }
}

export default muiThemeable()(Kodekort)
