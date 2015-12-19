angular.module("prochainsTrains").controller("StationCtrl", function (
  RatpService,
  lineDetails,
  $routeParams) {

  this.lineDetails = lineDetails;
  this.line = $routeParams.line;
  this.station = $routeParams.station;

  this.stopAreas = [];
  this.stops = {};

  this.hasSameDestinationForAllStops = (stops) => {
    return stops.every(stop => stop.destination === stops[0].destination);
  };

  RatpService.getDirections(this.line).then(directions => {
    directions.forEach(direction => {
      this.stopAreas.push({
        name: this.station,
        direction: direction.name,
      });
    });
    this.getStops();
  });

  this.getStops = () => {
    this.stopAreas.forEach(stopArea => {
      RatpService.getNextStops(this.line, stopArea.direction, stopArea.name).then((stops) => {
        this.stops[stopArea.name + stopArea.direction] = stops;
        this.lastUpdated = new Date();
      }, (response) => {
        this.stationDoesNotExist = (response.status === 404);
      });
    });
  };

});
