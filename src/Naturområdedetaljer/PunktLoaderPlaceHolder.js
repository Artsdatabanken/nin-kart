import React from 'react'
import ContentLoader from 'react-content-loader'

const PunktLoaderPlaceHolder = props => (
  <ContentLoader
    height={72}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="72" y="15" rx="4" ry="4" width="115" height="6.4" />
    <rect x="72" y="35" rx="3" ry="3" width="175" height="6.4" />
    <circle cx="38" cy="30" r="24" />
  </ContentLoader>
)

export default PunktLoaderPlaceHolder
