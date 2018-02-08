import React from 'react'
import { ListItem, Avatar } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

function PointInfo(props) {
  if (props.pointInfo && Object.keys(props.pointInfo).length > 0)
    return (
      <Route
        render={routing => (
          <React.Fragment>
            {Object.keys(props.pointInfo).map(key => {
              const item = props.pointInfo[key]
              return (
                <ListItem
                  primaryText={
                    item.uom ? item.value + ' ' + item.uom : item.value
                  }
                  onClick={() => {
                    routing.history.push('/katalog/' + key)
                  }}
                  secondaryText={
                    item.name || item.kode
                      ? props.excludeCode
                        ? item.name || item.kode
                        : (item.name || item.kode) + ' (' + key + ')'
                      : key
                  }
                  key={key}
                  leftAvatar={
                    item.homepage &&
                    item.logo &&
                    item.dataorigin && (
                      <a target="_blank" href={item.homepage}>
                        <Avatar
                          src={item.logo}
                          title={item.dataorigin}
                          style={{
                            objectFit: 'cover',
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: null,
                          }}
                        />
                      </a>
                    )
                  }
                  rightAvatar={
                    (item.article || item.metadata) && (
                      <a
                        target="_blank"
                        href={
                          item.article || item.metadata /*'/kode/LKM_'+key*/
                        }
                      >
                        <InfoOutline style={{ color: '#aaa' }} />
                      </a>
                    )
                  }
                />
              )
            })}
          </React.Fragment>
        )}
      />
    )
  return null
}

export default withRouter(PointInfo)
