import React from 'react'
import { ListItem, Avatar, List } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import backend from '../backend'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Collapsible from 'react-collapsible'
import PointInfo from './PointInfo'

function getHeaderStyle() {
  return {
    backgroundColor: 'lightgrey',
  }
}

function VectorPointInfo(props) {
  if (props.pointInfo && Object.keys(props.pointInfo).length > 0)
    return (
      <Route
        render={routing => (
          <React.Fragment>
            {Object.keys(props.pointInfo).map(key => {
              if (key.startsWith('NA_')) {
                return (
                  <Collapsible
                    key={key + '_Collapsible'}
                    open={true}
                    trigger={
                      <ListItem
                        key={key + '_' + props.pointInfo[key].value + 'Closed'}
                        primaryText={props.pointInfo[key].value}
                        secondaryText={
                          'Andel: ' +
                          (props.pointInfo[key].part
                            ? props.pointInfo[key].part * 10 + '%'
                            : '100%')
                        }
                        rightIcon={<HardwareKeyboardArrowDown />}
                        style={getHeaderStyle()}
                      />
                    }
                    triggerWhenOpen={
                      <ListItem
                        key={key + '_' + props.pointInfo[key].value + 'Open'}
                        primaryText={props.pointInfo[key].value}
                        secondaryText={
                          'Andel: ' +
                          (props.pointInfo[key].part
                            ? props.pointInfo[key].part * 10 + '%'
                            : '100%')
                        }
                        rightIcon={<HardwareKeyboardArrowUp />}
                        style={getHeaderStyle()}
                      />
                    }
                    easing="ease-in-out"
                  >
                    <List key={key + '_CodeAndArticle'}>
                      <ListItem
                        key={key + '_Kode'}
                        secondaryText={props.pointInfo[key].name}
                        primaryText="Kode"
                        onClick={() => {
                          const segments = key.match(/[a-zA-Z]+|[0-9]+/g) || []
                          const path = segments.join('/')
                          routing.history.push('/katalog/' + path)
                        }}
                      />
                      <ListItem
                        key={key + '_Artikkel'}
                        secondaryText={props.pointInfo[key].article}
                        primaryText="Artikkel"
                        onClick={e => {
                          e.stopPropagation()
                          window.open(props.pointInfo[key].article)
                        }}
                      />
                      {props.pointInfo[key].codes && (
                        <Collapsible
                          open={true}
                          trigger={
                            <ListItem
                              key={key + '_BeskrivelsesvariablerClosed'}
                              primaryText="Beskrivelsesvariabler"
                              rightIcon={<HardwareKeyboardArrowDown />}
                              style={getHeaderStyle()}
                            />
                          }
                          triggerWhenOpen={
                            <ListItem
                              key={key + '_BeskrivelsesvariablerOpen'}
                              primaryText="Beskrivelsesvariabler"
                              rightIcon={<HardwareKeyboardArrowUp />}
                              style={getHeaderStyle()}
                            />
                          }
                          easing="ease-in-out"
                        >
                          <List key={key + '_Beskrivelsesvariabler'}>
                            <PointInfo pointInfo={props.pointInfo[key].codes} />
                          </List>
                        </Collapsible>
                      )}
                    </List>
                  </Collapsible>
                )
              }

              const item = props.pointInfo[key]
              return (
                <ListItem
                  primaryText={
                    item.uom
                      ? Number(item.value).toFixed(1) + ' ' + item.uom
                      : item.value
                  }
                  onClick={() => {
                    const segments = key.match(/[a-zA-Z]+|[0-9]+/g) || []
                    const path = segments.join('/')
                    routing.history.push('/katalog/' + path)
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

export default withRouter(VectorPointInfo)
