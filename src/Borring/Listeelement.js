import {
  Avatar,
  Chip,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import tinycolor from 'tinycolor2'
import farger from '../farger'

const Listeelement = ({ kode, primary, secondary, history }) => {
  const prefix = kode.substring(0, 2)
  const farge = farger[prefix]
  const bgFarge = tinycolor(farge)
    .lighten(40)
    .setAlpha(0.95)
    .toHslString()
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
          onClick={() => history.push(`/katalog/` + kode)}
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
        </ListItem>
      </div>
      <Divider />
    </React.Fragment>
  )
}

export default withRouter(Listeelement)
