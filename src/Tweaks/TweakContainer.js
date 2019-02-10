import React from "react";
import { withRouter } from "react-router";
import Tweaks from "./";

class TweakContainer extends React.Component {
  componentDidMount() {
    const { history, kode, koder } = this.props;
    if (!koder[kode]) {
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
