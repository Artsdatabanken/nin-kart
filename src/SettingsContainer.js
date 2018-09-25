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
          visHovedmeny: this.state.visHovedmeny,
          visKoder: this.state.visKoder,
          sorterPåKode: this.state.sorterPåKode,
          visAktiveLag: this.state.visAktiveLag,
          onUpdateValue: this.handleUpdateValue,
          onToggleAktiveLag: this.handleToggleAktivelag,
          onToggleHovedmeny: this.handleToggleHovedmeny,
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    )
  }

  handleUpdateValue = (key, value) => {
    this.setState({ [key]: value })
    localStorage.setItem(key, value)
  }

  handleToggleAktivelag = () =>
    this.setState({ visAktiveLag: !this.state.visAktiveLag })

  handleToggleHovedmeny = () => {
    console.log('hoved', !this.state.visHovedmeny)
    this.setState({ visHovedmeny: !this.state.visHovedmeny })
  }
}

export default SetingsContainer
