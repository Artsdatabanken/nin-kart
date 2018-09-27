import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core'
import React from 'react'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'

const styles = {}

const Boble = ({ kode, farge, tittel, history }) => (
  <div
    onClick={() => history.location.push('/katalog/' + kode)}
    style={{
      padding: 8,
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'inline-block', paddingBottom: 8 }}>
      <BildeAvatar kode={kode} />
    </div>
    <div style={{}}>{tittel}</div>
  </div>
)

export default withRouter(withStyles(styles)(Boble))
