'use strict';

angular.module('myApp.programas', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial'])
 
    .config(['$routeProvider', function($routeProvider) {
      
      $routeProvider.when('/programas/new', {
        templateUrl: './webapp/programas/programas.html',
        controller: 'ProgramaController'
      });

      $routeProvider.when('/programas', {
        templateUrl: './webapp/programas/view.html',
        controller: 'ProgramaController'
      });
    }])

    .controller('ProgramaController', ['$scope', '$http', function($scope, $http) {

    	$scope.programas = [];
    	$scope.programa = {};

    	$scope.init = function() {
    		$http.get('http://localhost:8000/api/programas').success(function(data) {
    			$scope.programas = data;
    		});
    	}

    	$scope.init();

    	$scope.create = function() {
    		
            $http.post('http://localhost:8000/api/programas', $scope.programa).success(function(data) {

    			$scope.programas.push(data);

    			$scope.programa.nome = "";
    			$scope.programa.sigla = "";
    			$scope.programa.descricao = "";

                $scope.$broadcast('update', true);

                $scope.init();
    		});
    	}

        $scope.update = function($programa) {

            $http.put('http://localhost:8000/api/programas/' + $programa.id , $programa).success(function($programa) {

                $scope.programas.push($programa);

                $scope.programa.nome = "";
                $scope.programa.sigla = "";
                $scope.programa.descricao = "";

                $scope.$broadcast('update', true);

                $scope.init();
            });   
        }

        $scope.delete = function($programa) {

            $http.delete('http://localhost:8000/api/programas/' + $programa.id , $programa).success(function($programa) {

                $scope.$broadcast('update', true);

                $scope.init();
            });
        }
    }])

    // filterBy implementation
.filter('filterBy', function() {
    return function(array, query) {
    
        var parts = query && query.trim().split(/\s+/),
            keys = Object.keys(array[0]);


    
        if (!parts || !parts.length) return array;
    
        return array.filter(function(obj) {
            return parts.every(function(part) {
                return keys.some(function(key) {
                    return String(obj[key]).toLowerCase().indexOf(part.toLowerCase()) > -1;
                });
            });
        });
    };
})

.directive('ngFormPath', function () {
    return {
        controller: function($scope) {

        }
    };
})

.directive('myModal', function(){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'AE',
        require: '^ngFormPath', // Array = multiple requires, ? = optional, ^ = check parent elements
        scope: {
            ngFormPath: '@'
        },
        template: '<div>This is the {{ngFormPath}} color!</div>',
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function(scope, iElm, iAttrs) {
            iElm.bind('mouseenter', function() {
                iElm.css('background-color', 'blue');
            });
            iElm.bind('mouseleave', function() {
                iElm.css('background-color', 'none');
            });
            iElm.bind('click', function() {
                iElm.css('backgroundColor', 'red');
            });
        }
    };
});

