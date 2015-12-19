angular.module("prochainsTrains").factory("RatpService", function ($http) {
  const API_ENDPOINT = "https://ratp-api.leolam.fr/api";

  let cache = {};

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

  let query = (path, useCache) => {
    let url = API_ENDPOINT + path;
    if (useCache && cache[url]) {
      return cache[url];
    }
    let promise = $http.get(url)
      .then(res => {
        return res.data;
      });
    if (useCache) {
      cache[url] = promise;
    }
    return promise;
  };

  return {
    getNextStops(lineCode, directionName, stationName) {
      return query("/next-stops/line-" + lineCode +
        "/" + slugify(directionName) +
        "/" + slugify(stationName));
    },
    getStations(lineCode) {
      return query("/stations/line-" + lineCode, true);
    },
    getLines() {
      return query("/lines", true);
    },
    getDirections(lineCode) {
      return query("/directions/line-" + lineCode, true);
    },
  };
});
