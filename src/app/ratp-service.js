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
      return $http.get("http://p.leolam.fr:8800/api/next-stops/line-" + lineCode +
        "/" + slugify(directionName) +
        "/" + slugify(stationName))
        .then((res) => res.data);
    },
    getStations(lineCode) {
      return $http.get("http://p.leolam.fr:8800/api/stations/line-" + lineCode)
        .then((res) => res.data);
    },
    getLines() {
      return $http.get("http://p.leolam.fr:8800/api/lines")
        .then((res) => res.data);
    },
    getDirections(lineCode) {
      return $http.get("http://p.leolam.fr:8800/api/directions/line-" + lineCode)
        .then((res) => res.data);
    },
  };
});
