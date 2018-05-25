import { Avatar, ListItem } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import backend from '../backend'
// import PunktLoaderPlaceHolder from './PunktLoaderPlaceHolder'

function PointInfo(props) {
  if (props.pointInfo && Object.keys(props.pointInfo).length > 0)
    return (
      <Route
        render={routing => (
          <React.Fragment>
            {Object.keys(props.pointInfo)
              .sort()
              .map(key => {
                const item = props.pointInfo[key]
                return (
                  <ListItem
                    secondaryText={
                      item.uom
                        ? Number(item.value).toFixed(1) + ' ' + item.uom
                        : item.value
                    }
                    onClick={() => {
                      const segments = key.match(/[a-zA-Z]+|[0-9]+/g) || []
                      const path = segments.join('/')
                      routing.history.push('/katalog/' + path)
                    }}
                    primaryText={
                      item.name || item.kode ? item.name || item.kode : key
                    }
                    key={key}
                    leftAvatar={
                      item.homepage &&
                      item.logo &&
                      item.dataorigin && (
                        <a target="_blank" rel="noopener" href={item.homepage}>
                          <Avatar
                            src={item.logo}
                            onError={e => {
                              const brokenAvatar = backend.avatar40px('404', 40)
                              if (e.target.src !== brokenAvatar)
                                e.target.src = brokenAvatar
                            }}
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
                        <InfoOutline
                          onClick={e => {
                            e.stopPropagation()
                            window.open(item.article || item.metadata)
                          }}
                          style={{ color: '#aaa' }}
                        />
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
