'use strict';

angular.module('myApp.perfis', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages', 'md.data.table'])
	
	.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/perfis', {
			templateUrl: './webapp/perfis/perfis.html',
			controller: 'PerfilController'
		});
		
	}])
	.controller('PerfilController', ['$scope', '$http', function($scope, $http) {
		
		$scope.perfis = [];
		$scope.perfil = {};
	}]);