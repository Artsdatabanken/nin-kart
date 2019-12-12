import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { Route, withRouter } from "react-router-dom";
import backend from "../Funksjoner/backend";
import ResultatListe from "./ResultatListe";
import TopBar from "./TopBar";

class TopBarContainer extends Component {
  queryNumber = 0;
  state = { query: "", focused: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tittel !== nextProps.tittel) return true;
    if (this.props.children !== nextProps.children) return true;
    if (this.state.query !== nextState.query) return true;
    if (this.props.searchFor !== nextProps.searchFor) return true;
    if (this.state.searchResults !== nextState.searchResults) return true;
    if (this.state.focused !== nextState.focused) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.tittel !== prevProps.tittel && this.state.query)
      this.setState({ query: "" });
  }

  handleFocus = e => {
    this.setState({ focused: true });
    if (!this.props.query) this.handleQueryChange(e, this.props.tittel);
    if (this.props.onFocus) this.props.onFocus();
  };

  handleBlur = e => {
    this.setState({ focused: false, searchResults: null });
  };

  handleQueryChange = e => {
    const q = e.target.value;
    this.setState({
      query: q,
      _focused: !!q,
      error: null,
      searchResults: null
    });

    this.queryNumber++;
    const currentQuery = this.queryNumber;
    backend.søk(q).then(json => {
      if (currentQuery !== this.queryNumber) return; // Abort stale query
      if (json.error) return this.setState({ error: json.error });
      if (this.props.searchFor !== null)
        if (this.handleEksaktKodetreff(q, json.result)) return;
      this.setState({
        searchResults: json.result
      });
    });
  };

  handleEksaktKodetreff(q, result) {
    const key = q
      .split(" ")
      .join("-")
      .toUpperCase();
    const e = result.find(x => key === x.kode);
    if (e) this.handleNavigation(e.url);
    //    this.props.onClearSearchFor();
    return !!e;
  }

  handleGoBack = () => this.props.history.goBack();
  handleExitToRoot = () => {
    this.setState({ searchResults: null });
    this.props.history.push("/");
  };

  handleNavigation = url => {
    this.setState({ query: "", searchResults: null });
    this.props.history.push("/" + url);
  };

  handleKeyEnter = e => {
    if (this.state.searchResults && this.state.searchResults.length > 0) {
      this.handleNavigation(this.state.searchResults[0].url);
    }
    this.setState({ query: "", searchResults: null });
  };

  render() {
    const { tittel } = this.props;
    const { query, focused } = this.state;
    return (
      <Route
        render={({ match, history }) => {
          const isAtRoot =
            history.location.pathname + history.location.search === "/";
          return (
            <div
              style={{
                pointerEvents: "auto",
                overflowX: "hidden"
              }}
            >
              <TopBar
                onGoBack={this.handleGoBack}
                onExitToRoot={this.handleExitToRoot}
                isAtRoot={isAtRoot}
                query={focused ? query : query || tittel || ""}
                searchFor={this.props.searchFor}
                fromUrl={history.location.search}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyEnter={this.handleKeyEnter}
                tittel={tittel}
                onQueryChange={this.handleQueryChange}
                hasResults={!!this.state.searchResults}
              >
                {this.state.searchResults && (
                  <div>
                    <Divider />
                    <ResultatListe
                      query={this.state.query}
                      searchResults={this.state.searchResults}
                      onClick={this.handleNavigation}
                    />
                  </div>
                )}
              </TopBar>
            </div>
          );
        }}
      />
    );
  }
}

export default withRouter(TopBarContainer);
