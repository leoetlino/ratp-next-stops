angular.module("prochainsTrains").controller("SettingsCtrl", function (
  RatpService,
  $interval,
  $localStorage,
  $scope) {
  this.$storage = $localStorage.$default({
    stations: [],
  });
  this.removeStation = (station) => {
    this.$storage.stations = _.without(this.$storage.stations, station);
  };
  this.addStation = (line, direction, station) => {
    if (!line || !direction || !station) {
      throw new Error("Missing info");
    }
    if (!_.findWhere(this.stations, { name: station })) {
      throw new Error("Invalid station");
    }
    this.$storage.stations.push({ line, direction, name: station });
    $scope.line = $scope.direction = $scope.station = null;
  };
  this.lines = [];
  RatpService.getLines().then((lines) => { this.lines = lines; });
  $scope.$watch("line", (lineCode) => {
    if (!lineCode || !_.findWhere(this.lines, { code: lineCode })) {
      return;
    }
    RatpService.getDirections(lineCode).then((directions) => { this.directions = directions; });
    RatpService.getStations(lineCode).then((stations) => { this.stations = stations; });
  });
});
