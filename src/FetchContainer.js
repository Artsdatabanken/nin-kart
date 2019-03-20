import PropTypes from "prop-types";
import React from "react";
function increment(state) {
  return { loading: state.loading + 1 };
}
function decrement(state) {
  return { loading: state.loading - 1 };
}

function checkStatus(r) {
  if (r.status !== 200) {
    throw new Error(r.statusText + " (HTTP " + r.status + ")");
  }
  return r;
}

class FetchContainer extends React.Component {
  state = { loading: 0 };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        isloading: this.state.loading > 0 ? "true" : undefined,
        message: this.state.message
      })
    );

    return <>{childrenWithProps}</>;
  }

  static childContextTypes = {
    fetchJson: PropTypes.func,
    fetchImage: PropTypes.func
  };

  getChildContext = () => ({
    fetchJson: this.handleFetchJson,
    fetchImage: this.handleFetchImage
  });

  handleFetchImage = (description, url, callback) => {
    let img = new Image(); // TODO: Error handling
    img.onload = function() {
      callback(img);
    };
    img.src = url;
  };

  handleFetchJson = (description, url, callback) => {
    this.handleFetch(description, url, response => {
      const json = response.json();
      callback(json);
    });
  };

  handleFetch = (description, url, callback) => {
    this.flashMessage(`Loading ${description}...`);
    this.setState(increment);
    fetch(url)
      .then(checkStatus)
      .then(response => {
        if (!response.ok) throw new Error(response);
        callback(response);
        this.setState(decrement);
      })
      .catch(error => {
        this.setState(decrement);
        const message = description + ": " + error.message;
        console.error(message);
        this.flashMessage(message);
      });
  };

  flashMessage(message) {
    this.setState({ message });
    clearTimeout(this.messageTimer);
    this.messageTimer = window.setTimeout(
      () => this.setState({ message: null }),
      3500
    );
  }
}

export default FetchContainer;
