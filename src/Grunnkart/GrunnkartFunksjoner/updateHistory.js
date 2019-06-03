export default function updateHistory(node, place) {
  let current_navigation_history = place.state.navigation_history;
  current_navigation_history.push(node);
  place.setState({
    navigation_history: current_navigation_history
  });
}
