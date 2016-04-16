angular.module("prochainsTrains").controller("LinesCtrl", function (
  RatpService,
  $scope,
  $routeParams,
  $location) {

  this.showNextStopsForAll = false;
  this.direction = $routeParams.direction;
  this.lines = [];
  RatpService.getLines().then((lines) => {
    this.lines = lines;
    $scope.line = $routeParams.line;
  });
  $scope.$watch("line", (lineCode) => {
    let line = _.findWhere(this.lines, { code: lineCode });
    if (!lineCode || !line) {
      this.lineDetails = null;
      this.directions = null;
      this.stations = null;
      return;
    }
    RatpService.getLineDetails(lineCode).then(lineDetails => {
      this.lineDetails = lineDetails;
      if ($routeParams.direction) {
        $location.path("/lines/" + lineDetails.code + "/" + $routeParams.direction);
      } else {
        $location.path("/lines/" + lineDetails.code);
      }
    });
    if ($routeParams.direction) {
      RatpService.getStationsOnDirection(lineCode, $routeParams.direction)
        .then(stations => this.stations = stations,
          () => $location.path("/lines/" + this.lineDetails.code));
    } else {
      RatpService.getDirections(lineCode).then(directions => this.directions = directions);
      RatpService.getStations(lineCode).then(stations => this.stations = stations);
    }
  });

  this.refreshStops = () => {
    $scope.$broadcast("NextStopsCtrl::refreshStops");
  };
  this.setLastUpdated = (lastUpdated) => {
    this.lastUpdated = lastUpdated;
  };

});
