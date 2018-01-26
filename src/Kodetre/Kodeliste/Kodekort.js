import React from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import { IconButton, FlatButton } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Star from 'material-ui/svg-icons/toggle/star'
import Share from 'material-ui/svg-icons/social/share'

class Kodekort extends React.Component {
  state = {}

  componentWillReceiveProps(nextProps, props) {
    console.log(props, nextProps)
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
    const { data, forelder, selv } = this.props
    return (
      <Card>
        <CardHeader
          titleStyle={{ fontSize: 20 }}
          title={data.forelder ? data.forelder.navn : ''}
          subtitle={data.forelder ? data.forelder.kode : ''}
          subtitleColor="#03f"
          avatar={forelder.avatar}
          style={{
            cursor: 'pointer',
            display: data.forelder ? 'block' : 'none',
          }}
          onClick={() => this.props.onGoToCode(data.forelder.kode)}
        />
        <CardMedia
          overlay={
            <CardTitle title={data.navn} subtitle={data.kode}>
              <IconButton
                href={selv.infoUrl}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 12,
                }}
              >
                <InfoOutline color="#eee" />
              </IconButton>
            </CardTitle>
          }
          overlayStyle={{ background: 'rgba(0,0,0,0.012)' }}
        >
          <img
            src={selv.media}
            alt=""
            style={{ maxHeight: 300, objectFit: 'cover' }}
          />
        </CardMedia>
        <CardText>{selv.beskrivelse}</CardText>
        <CardActions>
          <IconButton style={{ float: 'right' }}>
            <Share />
          </IconButton>
          <IconButton
            style={{ float: 'right' }}
            onClick={() => this.toggleFavorite(data.kode)}
          >
            {this.state.favorite ? <Star /> : <StarBorder />}
          </IconButton>
          <FlatButton
            label="Vis i kart"
            onClick={() => this.props.onAddLayer(data.kode)}
          />
        </CardActions>
      </Card>
    )
  }
}

export default Kodekort
