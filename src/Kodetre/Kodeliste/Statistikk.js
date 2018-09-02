import typesystem from '@artsdatabanken/typesystem'
import { ListItem, ListItemText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import prettyprint from '../../prettyprint'

const styles = {
  li: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.87)',
    paddingLeft: 16,
  },
  color: {
    color: 'rgba(0,0,0,0.87)',
  },
}

const Statistikk = ({
  tittel,
  toppnavn,
  ingress,
  stats,
  infoUrl,
  arealVindu,
  arterVindu,
  geometrierVindu,
  classes,
}) => (
  <React.Fragment>
    {ingress && (
      <ListItem>
        <ListItemText
          classes={{
            primary: classes.li,
          }}
        >
          {ingress}
          {infoUrl && (
            <span>
              &nbsp;
              <a
                target="top"
                rel="noopener"
                className={classes.color}
                href={infoUrl}
              >
                {typesystem.capitalizeTittel(
                  new URL(infoUrl).host.split('.').splice(-2, 1)[0]
                )}
              </a>
            </span>
          )}
        </ListItemText>
      </ListItem>
    )}
    {stats.areal && (
      <ListItem>
        <ListItemText
          classes={{
            primary: classes.li,
          }}
        >
          Det er kartlagt <b>{prettyprint.prettyPrintAreal(stats.areal)}</b>
          &nbsp;
          {tittel.toLowerCase()}
          .&nbsp;
          {toppnavn && (
            <span>
              Dette utgjør&nbsp;
              <b>{((100 * stats.areal) / stats.arealPrefix).toFixed(1)} %</b> av
              kartlagte&nbsp;
              {toppnavn.toLowerCase()}.
            </span>
          )}
          {stats.arter && (
            <span>
              &nbsp;Det er observert <b>{stats.arter}</b> ulike arter i områder
              som er kartlagt som {tittel.toLowerCase()}.
            </span>
          )}
        </ListItemText>
      </ListItem>
    )}
  </React.Fragment>
)

export default withStyles(styles)(Statistikk)
