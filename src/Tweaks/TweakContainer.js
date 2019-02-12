import React from "react";
import { withRouter } from "react-router";
import Tweaks from "./";

class TweakContainer extends React.Component {
  componentDidMount() {
    console.warn(this.props);
    const { history, aktivtKartformat } = this.props;
    if (!aktivtKartformat) {
      // Laget er ikke lenger aktivt.  Url fra annen sesjon?
      history.replace("/");
    }
  }
  render() {
    const { history, match, koder, ...props } = this.props;
    return <Tweaks {...props} />;
  }
}

export default withRouter(TweakContainer);
