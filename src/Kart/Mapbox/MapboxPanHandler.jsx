import { experimental } from 'react-map-gl'

export default class MapboxPanHandler extends experimental.MapControls {
  constructor(props) {
    super(props)
    this.state = {
      onPanEnd: props.onPanEnd,
    }
  }

  _onPanEnd(event) {
    this.state.onPanEnd(event)
    return event
  }
}
