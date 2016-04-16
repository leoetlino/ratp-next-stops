angular.module("prochainsTrains").component("refreshPanel", {
  restrict: "E",
  templateUrl: "/app/refresh-panel.html",
  controller($interval) {
    const OUTDATED_THRESHOLD_IN_SEC = 20;

    this.isInfoOutdated = () => {
      if (!this.lastUpdated) {
        this.outdated = false;
      }
      this.outdated = ((new Date() - this.lastUpdated) / 1000) > OUTDATED_THRESHOLD_IN_SEC;
    };
    $interval(this.isInfoOutdated, 1000);
  },
  controllerAs: "refreshPanelCtrl",
  bindings: {
    lastUpdated: "=",
    refreshFn: "&?",
    autoRefresh: "=?",
  },
});
