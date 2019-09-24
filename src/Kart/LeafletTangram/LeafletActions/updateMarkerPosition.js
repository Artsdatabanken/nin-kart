export default function updateMarkerPosition(
  clickCoordinates,
  parent,
  header_shift
) {
  if (parent.marker) {
    let offset = parent.marker._mapToAdd._mapPane._leaflet_pos;

    parent.setState({
      clickCoordinates: clickCoordinates, // origin
      windowXpos: clickCoordinates.x + offset.x,
      windowYpos: clickCoordinates.y - header_shift + offset.y
    });
  }
}
