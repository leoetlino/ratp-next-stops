angular.module("prochainsTrains").factory("RatpService", function ($http) {
  const API_ENDPOINT = "https://ratp-api.leolam.fr/api";
  let slugify = (string) => {
    if (!string) {
      return "";
    }
    return string.toString().toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };
  return {
    getNextStops(lineCode, directionName, stationName) {
      return $http.get(API_ENDPOINT + "/next-stops/line-" + lineCode +
        "/" + slugify(directionName) +
        "/" + slugify(stationName))
        .then((res) => res.data);
    },
    getStations(lineCode) {
      return $http.get(API_ENDPOINT + "/stations/line-" + lineCode)
        .then((res) => res.data);
    },
    getLines() {
      return $http.get(API_ENDPOINT + "/lines")
        .then((res) => res.data);
    },
    getDirections(lineCode) {
      return $http.get(API_ENDPOINT + "/directions/line-" + lineCode)
        .then((res) => res.data);
    },
  };
});
