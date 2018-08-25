import React from 'react'
import prettyprint from '../../prettyprint'
const VolumViz = ({ areal, størsteAreal, theme }) => {
  if (!areal) areal = 0
  if (!størsteAreal) størsteAreal = 1
  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: 200,
        }}
      >
        <div
          style={{
            marginTop: 4,
            float: 'left',
            height: 4,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            width: `${(100.0 * areal) / størsteAreal}%`,
            backgroundColor: theme.palette.secondary.main,
          }}
          title={'areal: ' + prettyprint.prettyPrintAreal(areal)}
        />
      </div>
      <div
        style={{
          display: 'inline',
          position: 'absolute',
          right: 52,
          float: 'right',
        }}
      >
        {false && prettyprint.prettyPrintAreal(areal)}
      </div>
    </div>
  )
}
export default VolumViz
