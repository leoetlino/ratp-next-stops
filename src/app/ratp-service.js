angular.module("prochainsTrains").factory("RatpService", function ($http, normaliseName) {
  const API_ENDPOINT = "https://ratp-api.leolam.fr/api";

  let cache = {};

  let slugify = (string) => normaliseName.normalise(string);

  let query = (path, { useCache = false, retryOn503 = true } = {}) => {
    let url = API_ENDPOINT + path;
    if (useCache && cache[url]) {
      return cache[url];
    }
    let promise = $http.get(url, { timeout: 5000 })
      .then(res => {
        return res.data;
      }, (response) => {
        cache[url] = null;
        if (response.status === 404) {
          return Promise.reject("Not found");
        }
        if (response.status === 503 && retryOn503) {
          return query(path, { useCache, retryOn503: false });
        }
        return Promise.reject("Unexpected error");
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
      return query("/stations/line-" + lineCode, { useCache: true });
    },
    getStationsOnDirection(lineCode, direction) {
      return query(`/stations/line-${lineCode}/${direction}`, { useCache: true });
    },
    getLines() {
      return query("/lines", { useCache: true });
    },
    getLineDetails(lineCode) {
      return query("/lines/" + lineCode, { useCache: true });
    },
    getDirections(lineCode) {
      return query("/directions/line-" + lineCode, { useCache: true });
    },
  };
});
