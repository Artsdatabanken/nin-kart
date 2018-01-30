import React, { PureComponent } from 'react'
import { Paper } from 'material-ui'

export default class Kontrollpanel extends PureComponent {
  renderLayerControl(name) {
    return (
      <div key={name} className="input">
        <input
          type="checkbox"
          checked={this.props.visibility[name]}
          onChange={this.props.handleVisibilityChange.bind(this, name)}
        />
        <label>{name}</label>
        {this.props.color[name] && (
          <input
            type="color"
            value={this.props.color[name]}
            disabled={!this.props.visibility[name]}
            onChange={this.props.handleColorChange.bind(this, name)}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Paper
          zDepth={3}
          style={{ width: 480, position: 'absolute', right: 8, top: 8 }}
        >
          <h3>Kartlag</h3>
          <hr />
          {this.props.categories &&
            this.props.categories.map(name => this.renderLayerControl(name))}
          <p />
        </Paper>
      </div>
    )
  }
}
