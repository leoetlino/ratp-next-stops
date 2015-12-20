angular.module("prochainsTrains").controller("StopsCtrl", function (
  $localStorage,
  $scope
) {

  this.$storage = $localStorage.$default({
    stations: [],
    autoRefresh: true,
    autoRefreshInterval: 15,
  });
  this.autoRefresh = this.$storage.autoRefresh;

  this.refreshStops = () => {
    $scope.$broadcast("NextStopsCtrl::refreshStops");
  };

  this.setLastUpdated = (lastUpdated) => {
    this.lastUpdated = lastUpdated;
  };

});
