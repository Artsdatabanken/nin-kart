import React, { Component } from 'react'
import { SettingsContext } from './SettingsContext'

class SetingsContainer extends Component {
  state = { visKoder: false, visAktiveLag: false, visHovedmeny: false }
  componentDidMount() {
    this.setState({
      visKoder: localStorage.getItem('visKoder') === 'true',
      sorterPåKode: localStorage.getItem('sorterPåKode') === 'true',
    })
  }

  render() {
    return (
      <SettingsContext.Provider
        value={{
          visHovedmeny: this.state.visHovedMeny,
          visKoder: this.state.visKoder,
          sorterPåKode: this.state.sorterPåKode,
          visAktiveLag: this.state.visAktiveLag,
          onUpdateValue: (key, value) => {
            this.setState({ [key]: value })
            localStorage.setItem(key, value)
          },
          onToggleAktiveLag: () => {
            this.setState({ visAktiveLag: !this.state.visAktiveLag })
          },
          onToggleHovedmeny: () => {
            this.setState({ visHovedmeny: !this.state.visHovedmeny })
          },
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SetingsContainer
