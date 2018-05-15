import React from 'react'
import Dialog from 'material-ui/Dialog'
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import backend from '../../backend'

export default class BildeDialog extends React.Component {
  state = { credit: {} }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.visBilde) {
      this.fetchData(nextProps.kode)
    }
  }

  fetchData(kode: string, bounds: Object) {
    backend.getImageAttribution(kode).then(data => {
      this.setState({ credit: data })
    })
  }

  render() {
    const { kode, tittel } = this.props
    const srcSet = `${backend.getFotoOmslag(
      kode,
      612
    )} 1.5x, ${backend.getFotoOmslag(kode, 816)} 2x`
    const actions = [
      <FlatButton
        label="Lukk"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleClose}
      />,
    ]
    const customContentStyle = {
      height: '90%',
      maxWidth: 'none',
      overflow: 'auto',
    }

    if (this.state.credit && this.state.credit.license) {
      return (
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.props.visBilde}
            onRequestClose={this.props.handleClose}
            contentStyle={customContentStyle}
          >
            <Card>
              <CardHeader title={kode} subtitle={tittel} />
              <CardMedia>
                <img
                  src={backend.getFotoOmslag(kode)}
                  srcSet={srcSet}
                  onError={e => {
                    const brokenImage = backend.getFotoOmslag('~')
                    if (e.target.src !== brokenImage) e.target.src = brokenImage
                  }}
                  alt=""
                  style={{
                    minHeight: 612,
                    objectFit: 'cover',
                  }}
                />
              </CardMedia>
              <CardTitle
                title="Lisens"
                children={
                  <a
                    href={this.state.credit.license.url}
                    rel="noopener"
                    target="new"
                  >
                    {this.state.credit.license.name}
                  </a>
                }
              />
              <CardText>
                <a
                  href={this.state.credit.attribution.url}
                  rel="noopener"
                  target="new"
                >
                  {this.state.credit.attribution.name}
                </a>
              </CardText>
            </Card>
          </Dialog>
        </div>
      )
    }
    return null
  }
}
