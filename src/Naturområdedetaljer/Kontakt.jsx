import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import SocialPerson from 'material-ui/svg-icons/social/person'
import CommunicationBusiness from 'material-ui/svg-icons/communication/business'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail'

class Kontakt extends Component {
  render() {
    return (
      <div>
        <ListItem
          primaryText="Evenrude"
          secondaryText="Firma"
          leftIcon={<CommunicationBusiness />}
        />
        <ListItem
          primaryText="Ole i'Dole"
          secondaryText="Kontaktperson"
          leftIcon={<SocialPerson />}
        />
        <ListItem leftIcon={<CommunicationContactMail />} secondaryText="Epost">
          <a href="mailto:ole@idole.com">ole@idole.com</a>
        </ListItem>
        <ListItem
          primaryText={<a href="tel:+47 99 55 11 45">+47 99 55 11 45</a>}
          secondaryText="Telefon"
          leftIcon={<CommunicationCall />}
        />
      </div>
    )
  }
}

export default Kontakt
