angular.module("prochainsTrains").controller("StopsCtrl", function (RatpService, $interval, $localStorage) {
  this.$storage = $localStorage.$default({
    stations: [],
  });
  this.stops = {};
  this.getStops = () => {
    this.$storage.stations.forEach((station) => {
      RatpService.getNextStops(station.line, station.direction, station.name).then((stops) => {
        this.stops[station.name] = stops;
        this.lastUpdated = new Date();
      });
    });
  };
  this.getStops();
  this.intervalRef = null;
  this.setInterval = (intervalInSeconds) => {
    if (this.intervalRef) {
      $interval.cancel(this.intervalRef);
      this.intervalRef = null;
    }
    this.intervalRef = $interval(this.getStops, intervalInSeconds * 1000);
  };
  this.stopInterval = () => {
    if (this.intervalRef) {
      $interval.cancel(this.intervalRef);
      this.intervalRef = null;
    }
  };
  this.setInterval(15);
});
