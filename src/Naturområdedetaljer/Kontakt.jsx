import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import SocialPerson from 'material-ui/svg-icons/social/person'
import CommunicationBusiness from 'material-ui/svg-icons/communication/business'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail'

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
          <a href={"mailto:"+this.props.email}>{this.props.email}</a>
        </ListItem>
        <ListItem
          primaryText={<a href={"tel:"+this.props.phone}>{this.props.phone}</a>}
          secondaryText="Telefon"
          leftIcon={<CommunicationCall />}
        />
      </div>
    )
  }
}

export default Kontakt
