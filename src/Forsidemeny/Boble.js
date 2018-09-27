import { withRouter } from 'react-router'
import { AppBar, Avatar, withStyles } from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
import React from 'react'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'

const styles = {}

const Boble = ({ kode, farge, tittel, onClick }) => (
  <div
    onClick={() => onClick(kode)}
    style={{
      padding: 8,
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'inline-block', paddingBottom: 8 }}>
      <BildeAvatar kode={kode} />
    </div>
    <div
      style={{
        fontWeight: 400,
        fontSize: 14,
        color: 'hsla(0, 0%, 0%, 0.54)',
      }}
    >
      {tittel}
    </div>
  </div>
)

export default withRouter(withStyles(styles)(Boble))
