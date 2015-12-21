var app = angular.module("prochainsTrains", [
  "templates",
  "ngRoute",
  "ngSanitize",
  "ngStorage",
  "mgcrea.ngStrap",
  "picardy.fontawesome",
]);

app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "/app/home/stops.html",
    controller: "StopsCtrl",
    controllerAs: "ctrl",
  });
  $routeProvider.when("/lines", {
    templateUrl: "/app/lines/lines.html",
    controller: "LinesCtrl",
    controllerAs: "ctrl",
  });
  $routeProvider.when("/lines/:line", {
    templateUrl: "/app/lines/lines.html",
    controller: "LinesCtrl",
    controllerAs: "ctrl",
  });
  $routeProvider.when("/lines/:line/:direction", {
    templateUrl: "/app/lines/lines.html",
    controller: "LinesCtrl",
    controllerAs: "ctrl",
  });
  $routeProvider.when("/stations/line-:line/:station", {
    templateUrl: "/app/station/station.html",
    controller: "StationCtrl",
    controllerAs: "ctrl",
    resolve: {
      lineDetails: (RatpService, $route) => {
        return RatpService.getLineDetails($route.current.params.line);
      },
    },
  });
  $routeProvider.when("/settings", {
    templateUrl: "/app/settings/settings.html",
    controller: "SettingsCtrl",
    controllerAs: "ctrl",
  });
});
