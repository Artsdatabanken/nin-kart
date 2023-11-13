import { Component, default as React } from "react";
import { withRouter } from "../../withRouter";
import backend from "Funksjoner/backend";
import NA from "./NA";

class NAContainer extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.geom_id !== this.props.geom_id) this.fetch();
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    if (!this.props.geom_id) return;
    backend.hentKildedata(this.props.geom_id).then(data => {
      this.setState({
        data: data
      });
    });
  }
  handleClick = kode => this.props.navigate(`/katalog/${kode}`);

  render() {
    return (
      <NA
        {...this.state.data}
        geom_id={this.props.geom_id}
        onClick={this.handleClick}
      />
    );
  }
}

export default withRouter(NAContainer);
