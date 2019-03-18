import { Input, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";

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
    if (this.props.unknownUrl) {
      this.props.onQueryChange({
        target: { value: this.props.unknownUrl }
      });

      this.inputRef.current.focus();
    }
  }

  componentDidUpdate(prevprops) {
    if (
      this.props.unknownUrl &&
      this.props.unknownUrl !== prevprops.unknownUrl
    ) {
      this.inputRef.current.focus();
      this.props.onQueryChange({
        target: { value: this.props.unknownUrl }
      });
    }
  }

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.props.onKeyEnter();
        break;
      case 27:
        e.stopPropagation();
        e.preventDefault();
        this.props.onQueryChange({
          target: { value: "" }
        });
        this.inputRef.current.blur();
        break;
      default:
        return;
    }
  };

  render() {
    const { onFocus, onBlur, onQueryChange, query, classes } = this.props;
    return (
      <Input
        inputRef={this.inputRef}
        onKeyDown={this.handleKeyDown}
        value={query}
        placeholder={"Søk i Natur i Norge"}
        onFocus={onFocus}
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

export default withStyles(styles)(SearchBox);
