angular.module("prochainsTrains").controller("StationCtrl", function (
  RatpService,
  lineDetails,
  $routeParams,
  $scope
) {

  this.lineDetails = lineDetails;
  this.line = $routeParams.line;
  this.station = $routeParams.station;

  this.stopAreas = [];
  RatpService.getDirections(this.line).then(directions => {
    directions.forEach(direction => {
      this.stopAreas.push({
        name: this.station,
        direction: direction.name,
        line: this.line,
      });
    });
    this.refreshStops();
  });

  this.autoRefresh = true;

  this.refreshStops = () => {
    $scope.$broadcast("NextStopsCtrl::refreshStops");
  };

  this.setLastUpdated = (lastUpdated) => {
    this.lastUpdated = lastUpdated;
  };

});
