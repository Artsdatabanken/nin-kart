import React, { Component } from 'react'
import { SettingsContext } from './SettingsContext'

class SetingsContainer extends Component {
  state = { visKoder: false, visAktiveLag: false }
  componentDidMount() {
    this.setState({ visKoder: localStorage.getItem('visKoder') === 'true' })
  }

  render() {
    return (
      <SettingsContext.Provider
        value={{
          visKoder: this.state.visKoder,
          visAktiveLag: this.state.visAktiveLag,
          onUpdateValue: (key, value) => {
            this.setState({ [key]: value })
            localStorage.setItem(key, value)
          },
          onToggleAktiveLag: () => {
            this.setState({ visAktiveLag: !this.state.visAktiveLag })
          },
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SetingsContainer
