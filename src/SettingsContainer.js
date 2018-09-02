import React, { Component } from 'react'
import { SettingsContext } from './SettingsContext'

class SetingsContainer extends Component {
  state = { visKoder: false }
  componentDidMount() {
    this.setState({ visKoder: localStorage.getItem('visKoder') === 'true' })
  }

  render() {
    return (
      <SettingsContext.Provider
        value={{
          visKoder: this.state.visKoder,
          updateValue: (key, value) => {
            this.setState({ [key]: value })
            localStorage.setItem(key, value)
          },
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SetingsContainer
