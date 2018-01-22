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
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Share from 'material-ui/svg-icons/social/share'

class Kodekort extends React.Component {
  render() {
    const { forelder, selv } = this.props
    return (
      <Card>
        <CardHeader
          titleStyle={{ fontSize: 20 }}
          title={forelder.tittel}
          subtitle={forelder.kode}
          subtitleColor="#03f"
          avatar={forelder.avatar}
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.onGoToCode(forelder.kode)}
        />
        <CardMedia
          overlay={
            <CardTitle title={selv.tittel} subtitle={selv.kode}>
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
          <FlatButton label="Vis i kart" />
        </CardActions>
      </Card>
    )
  }
}

export default Kodekort
