export default function updateMarkerPosition(clickCoordinates, parent) {
  if (parent.marker) {
    let offset = parent.marker._mapToAdd._mapPane._leaflet_pos;

    parent.setState({
      clickCoordinates: clickCoordinates, // origin
      windowXpos: clickCoordinates.x + offset.x,
      windowYpos: clickCoordinates.y - 56 + offset.y
    });
  }
}
