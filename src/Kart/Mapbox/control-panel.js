import React, { PureComponent } from 'react'
import { Paper } from 'material-ui'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

export default class StyleControls extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  renderLayerControl(name) {
    return (
      <div key={name} className="input">
        <input
          type="checkbox"
          checked={this.props.visibility[name]}
          onChange={this.props.handleVisibilityChange.bind(this, name)}
        />
        <label>{name}</label>
        <input
          type="color"
          value={this.props.color[name]}
          disabled={!this.props.visibility[name]}
          onChange={this.props.handleColorChange.bind(this, name)}
        />
      </div>
    )
  }
  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div>
        <IconButton tooltip="Meny" onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>

        <Paper
          zDepth={3}
          style={{ width: 480, position: 'absolute', right: 8, top: 8 }}
        >
          <h3>Kartlag</h3>
          <hr />
          {this.props.categories.map(name => this.renderLayerControl(name))}

          <input
            type="button"
            onClick={this.props.onShowKodetre}
            value="Legg til lag"
          />
        </Paper>
      </div>
    )
  }
}
