import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { Route, withRouter } from "react-router-dom";
import backend from "../backend";
import ResultatListe from "../Kodetre/Kodeliste/ResultatListe";
import TopBar from "./TopBar";

type State = {
  searchResults: Array<Object>,
  query: string,
  focused: boolean,
  onFocus: Function,
  onBlur: Function,
  onQueryChange: Function
};

type Props = {
  tittel: string,
  inlineResultat: boolean
};

class TopBarContainer extends Component<Props, State> {
  queryNumber = 0;
  state = { query: "", focused: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tittel !== nextProps.tittel) return true;
    if (this.props.children !== nextProps.children) return true;
    if (this.state.query !== nextState.query) return true;
    if (this.props.unknownUrl !== nextProps.unknownUrl) return true;
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
      error: null,
      searchResults: null
    });

    this.queryNumber++;
    const currentQuery = this.queryNumber;

    backend.søk(q).then(json => {
      if (currentQuery !== this.queryNumber) return; // Abort stale query
      if (json.error) {
        this.setState({ error: json.error });
      } else {
        this.setState({
          searchResults: json.result
        });
      }
    });
  };

  handleGoBack = () => this.props.history.goBack();
  handleExitToRoot = () => {
    this.setState({ searchResults: null });
    this.props.history.push("/");
  };

  handleNavigation = url => {
    this.setState({ query: "", searchResults: null });
    this.props.history.push("/" + url);
  };

  render() {
    const { tittel, style } = this.props;
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
                unknownUrl={this.props.unknownUrl}
                fromUrl={history.location.search}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                tittel={tittel}
                onQueryChange={this.handleQueryChange}
                hasResults={!!this.state.searchResults}
              />
              <div
                style={{
                  width: 408,
                  paddingBottom: 0,
                  ...style
                }}
              >
                {(isAtRoot || focused) && (
                  <div
                    style={{
                      width: 408,
                      marginTop: 55,
                      marginBottom: isAtRoot ? 8 : 0,
                      position: isAtRoot ? "relative" : "fixed",
                      zIndex: 10
                    }}
                  >
                    {this.state.searchResults && (
                      <div style={{ marginLeft: 8, marginRight: 8 }}>
                        <Divider />
                        <ResultatListe
                          query={this.state.query}
                          searchResults={this.state.searchResults}
                          onClick={this.handleNavigation}
                        />
                      </div>
                    )}
                    {this.props.children}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default withRouter(TopBarContainer);
