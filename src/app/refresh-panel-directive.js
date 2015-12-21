angular.module("prochainsTrains").component("refreshPanel", {
  restrict: "E",
  templateUrl: "/app/refresh-panel.html",
  controller: () => {},
  controllerAs: "refreshPanelCtrl",
  bindings: {
    lastUpdated: "=",
    refreshFn: "&?",
    autoRefresh: "=?",
  },
});
