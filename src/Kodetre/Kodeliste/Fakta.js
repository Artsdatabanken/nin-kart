import React from 'react'

const Fakta = ({ tittel, verdi, synlig }) => {
  if (!verdi) return null
  return (
    <div
      style={{
        fontSize: 13,
        paddingLeft: 24,
        lineHeight: '1.5em',
      }}
    >
      <span style={{ fontWeight: 700 }}>
        {tittel}
        :&nbsp;
      </span>
      {verdi}
    </div>
  )
}

export default Fakta
