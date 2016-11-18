angular.module('pos', ['ionic', 'pos.controllers', 'pos.routes', 'pos.services', 'pos.api', 'angularMoment', 'nvd3ChartDirectives'])

  .config(
  [function () {
  }]
  )

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
    });
  });
