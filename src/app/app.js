var app = angular.module("prochainsTrains", [
  "templates",
  "ngRoute",
  "ngSanitize",
  "ngStorage",
  "mgcrea.ngStrap",
]);

app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "/app/stops.html",
    controller: "StopsCtrl",
    controllerAs: "ctrl",
  });
  $routeProvider.when("/settings", {
    templateUrl: "/app/settings.html",
    controller: "SettingsCtrl",
    controllerAs: "ctrl",
  });
});
