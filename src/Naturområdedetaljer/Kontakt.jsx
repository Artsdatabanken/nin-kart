import { ListItem } from '@material-ui/core/List'
import CommunicationBusiness from '@material-ui/icons/Business'
import CommunicationCall from '@material-ui/icons/Call'
import CommunicationContactMail from '@material-ui/icons/ContactMail'
import SocialPerson from '@material-ui/icons/Person'
import React, { Component } from 'react'

class Kontakt extends Component {
  render() {
    return (
      <div>
        <ListItem
          primaryText={this.props.company}
          secondaryText="Firma"
          leftIcon={<CommunicationBusiness />}
        />
        <ListItem
          primaryText={this.props.contactPerson}
          secondaryText="Kontaktperson"
          leftIcon={<SocialPerson />}
        />
        <ListItem leftIcon={<CommunicationContactMail />} secondaryText="Epost">
          <a href={'mailto:' + this.props.email}>{this.props.email}</a>
        </ListItem>
        <ListItem
          primaryText={
            <a href={'tel:' + this.props.phone}>{this.props.phone}</a>
          }
          secondaryText="Telefon"
          leftIcon={<CommunicationCall />}
        />
      </div>
    )
  }
}

export default Kontakt
