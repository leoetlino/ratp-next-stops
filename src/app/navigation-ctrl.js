angular.module("prochainsTrains").controller("NavigationCtrl", function (
  $location
) {

  this.isActive = (viewLocation) => {
    return (viewLocation === "/" ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1);
  };

});
