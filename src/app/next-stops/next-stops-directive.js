angular.module("prochainsTrains").component("nextStops", {
  restrict: "E",
  templateUrl: "/app/next-stops/next-stops.html",
  controller: "NextStopsCtrl as NextStopsCtrl",
  bindings: {
    station: "=",
    autoRefresh: "=?",
    autoRefreshInterval: "=?",
    onRefreshed: "&?",
  },
});
