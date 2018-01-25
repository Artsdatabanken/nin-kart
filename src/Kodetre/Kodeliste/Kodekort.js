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
import Share from 'material-ui/svg-icons/social/share'

class Kodekort extends React.Component {
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
          <IconButton style={{ float: 'right' }}>
            <StarBorder />
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
