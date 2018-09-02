import {
  Avatar,
  Chip,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import farger from '../farger'
import { SettingsContext } from '../SettingsContext'

const Listeelement = ({ kode, primary, secondary, history, geom_id }) => {
  const prefix = kode.substring(0, 2)
  const bgFarge = farger.lys[prefix]
  const avatar = false
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background:
            'linear-gradient(300deg, hsla(0, 0%, 100%, 0.3) 0%, ' +
            bgFarge +
            ' 50%), url("/kode/' +
            kode +
            '.jpg")',
        }}
      >
        <ListItem
          button={true}
          onClick={() => {
            if (geom_id) history.push(`/detaljer/${prefix}/${geom_id}`)
            else history.push(`/katalog/${kode}`)
          }}
        >
          {avatar && (
            <Avatar
              style={{
                backgroundColor: farger[prefix],
                color: 'white',
              }}
            >
              {prefix}
            </Avatar>
          )}
          <ListItemText
            style={{ color: 'white' }}
            primary={primary}
            secondary={secondary}
          />
          <SettingsContext.Consumer>
            {context => {
              return (
                context.visKoder && (
                  <div style={{ position: 'absolute', right: 8, bottom: 8 }}>
                    {kode.length > 3 && (
                      <Chip
                        avatar={
                          !avatar && (
                            <Avatar
                              style={{
                                backgroundColor: farger[prefix],
                                color: 'white',
                              }}
                            >
                              {prefix}
                            </Avatar>
                          )
                        }
                        label={kode.substring(3)}
                      />
                    )}
                  </div>
                )
              )
            }}
          </SettingsContext.Consumer>
        </ListItem>
      </div>
      <Divider />
    </React.Fragment>
  )
}

export default withRouter(Listeelement)
