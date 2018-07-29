import React from 'react'
const VolumIndikator = ({ areal, størsteAreal, theme }) => {
  if (!areal) areal = 0
  if (!størsteAreal) størsteAreal = 1
  return (
    <div
      style={{
        position: 'absolute',
        top: 6,
        left: 0,
        height: 56,
        width: `${(80.0 * areal) / størsteAreal}%`,
        backgroundColor: '#eee',
        zIndex: -1,
      }}
    />
  )
}
export default VolumIndikator
