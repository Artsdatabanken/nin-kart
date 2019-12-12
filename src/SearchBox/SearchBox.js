import { Input, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  input: {
    textOverflow: "ellipsis"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyDown);
    if (this.props.searchFor) {
      this.props.onQueryChange({
        target: { value: this.props.searchFor }
      });

      this.inputRef.current.focus();
    }
  }

  componentDidUnMount() {
    window.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = event => {
    const ESCAPE_KEY = 27;
    switch (event.keyCode) {
      case ESCAPE_KEY:
        this.props.history.goBack();
        break;
      default:
        break;
    }
  };

  componentDidUpdate(prevprops) {
    if (this.props.searchFor && this.props.searchFor !== prevprops.searchFor) {
      this.inputRef.current.focus();
      this.props.onQueryChange({
        target: { value: this.props.searchFor.split("/").join(" ") }
      });
    }
  }

  handleKeyDown = event => {
    switch (event.keyCode) {
      case 13:
        this.props.onKeyEnter();
        this.inputRef.current.blur();
        break;
      case 27:
        this.props.onBlur(false);
        this.inputRef.current.blur();
        event.stopPropagation();
        break;
      default:
        break;
    }
  };

  handleFocus = event => {
    event.target.select();
    this.props.onFocus(event);
  };

  render() {
    const { onBlur, onQueryChange, query, classes } = this.props;
    return (
      <Input
        inputRef={this.inputRef}
        onKeyDown={this.handleKeyDown}
        value={query}
        placeholder={"Forvaltningsportalen"}
        onFocus={this.handleFocus}
        onBlur={onBlur}
        onChange={onQueryChange}
        fullWidth={true}
        disableUnderline={true}
        classes={classes}
      />
    );
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func
};

export default withRouter(withStyles(styles)(SearchBox));
