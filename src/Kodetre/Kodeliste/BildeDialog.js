import Button from '@material-ui/core/Button'
import {
  Card,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
} from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import React from 'react'
import config from '../../config'

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
    const srcSet = `${config.getFotoOmslag(
      kode,
      612
    )} 1.5x, ${config.getFotoOmslag(kode, 816)} 2x`
    const actions = [
      <Button
        label="Lukk"
        color="primary"
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
              <CardMedia
                src={config.getFotoOmslag(kode)}
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
