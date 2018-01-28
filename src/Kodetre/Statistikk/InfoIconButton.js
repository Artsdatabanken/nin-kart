import React from 'react'
import { IconButton } from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'

const InfoIconButton = ({ href }) => {
  return (
    href && (
      <IconButton
        href={href}
        style={{
          display: 'float',
          float: 'right',
        }}
      >
        <InfoOutline />
      </IconButton>
    )
  )
}

export default InfoIconButton
