angular.module("prochainsTrains").controller("NextStopsCtrl", function (
  RatpService,
  $interval,
  $scope
) {

  this.onRefreshed = this.onRefreshed || (() => {});
  this.autoRefreshInterval = this.autoRefreshInterval || 15;

  this.hasSameDestinationForAllStops = () => {
    return this.stops.every(stop => stop.destination === this.stops[0].destination);
  };

  // Get stops and assign them to this.stops.
  let getStops = () => {
    if (this.station.disabled) {
      return;
    }
    RatpService.getNextStops(this.station.line, this.station.direction, this.station.name)
      .then(stops => {
        this.stops = stops;
        this.onRefreshed({ lastUpdated: new Date() });
      });
  };
  getStops();
  $scope.$on("NextStopsCtrl::refreshStops", (event, relatedStation) => {
    if (relatedStation && !angular.equals(relatedStation, this.station)) {
      return;
    }
    getStops();
  });

  // Auto-refresh code
  let intervalRef = null;
  this.setInterval = (intervalInSeconds) => {
    if (intervalRef) {
      $interval.cancel(intervalRef);
      intervalRef = null;
    }
    this.autoRefresh = true;
    intervalRef = $interval(getStops, intervalInSeconds * 1000);
  };
  this.stopInterval = () => {
    if (intervalRef) {
      $interval.cancel(intervalRef);
      this.autoRefresh = false;
      intervalRef = null;
    }
  };
  if (this.autoRefresh) {
    this.setInterval(this.autoRefreshInterval);
  }
  $scope.$watch(() => this.autoRefresh, (shouldAutoRefresh) => {
    if (shouldAutoRefresh) {
      this.setInterval(this.autoRefreshInterval);
    } else {
      this.stopInterval();
    }
  });
  $scope.$on("$destroy", this.stopInterval);

  // Enable/disable
  this.enableStation = () => {
    this.station.disabled = false;
    getStops();
  };
  this.disableStation = () => {
    this.station.disabled = true;
  };

});
