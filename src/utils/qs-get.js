import qs from "query-string";

export function get(location, name) {
  const query = qs.parse(location.search);
  return name ? query[name] : query;
}
