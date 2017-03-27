angular.module('appControllers', []);

var app = angular.module('aws', ['ngRoute', 'appConfig', 'appControllers', 'appServices', 'appDirectives', 'appModel']);

app.config(function($routeProvider) {
    $routeProvider
        .otherwise({
              templateUrl: 'views/index.html',
              controller: 'IndexCtrl'
        });
})
