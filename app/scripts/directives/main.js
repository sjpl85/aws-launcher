'use strict';

angular.module('appDirectives', [])
	.directive('instance', function() {
		return {
			restrict: 'E',
			replace: 'true',
			templateUrl: 'scripts/directives/instances.html',
			link: function(scope, element, attrs) {}
		};
	})
