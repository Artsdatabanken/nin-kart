export default function redirectTo(path, place) {
  const newUrl = "/" + path;
  place.props.history.replace(newUrl);
}
