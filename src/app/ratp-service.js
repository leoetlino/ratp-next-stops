angular.module("prochainsTrains").factory("RatpService", function ($http) {
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
      return $http.get("https://ratp-api.leolam.fr/api/next-stops/line-" + lineCode +
        "/" + slugify(directionName) +
        "/" + slugify(stationName))
        .then((res) => res.data);
    },
    getStations(lineCode) {
      return $http.get("https://ratp-api.leolam.fr/api/stations/line-" + lineCode)
        .then((res) => res.data);
    },
    getLines() {
      return $http.get("https://ratp-api.leolam.fr/api/lines")
        .then((res) => res.data);
    },
    getDirections(lineCode) {
      return $http.get("https://ratp-api.leolam.fr/api/directions/line-" + lineCode)
        .then((res) => res.data);
    },
  };
});
