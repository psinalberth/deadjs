angular.module('myApp.nutritionApp', ['md.data.table', 'ngMaterial', 'ngRoute']).controller('NutritionController', ['$scope', '$http', function($scope, $http) {
  'use strict';

  var bookmark;
  
  $scope.selected = [];
  $scope.desserts = [];
  
  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '5',
    order: 'nameToLower',
    page: 1
  };
  
  $scope.success = function() {
    $http.get('http://localhost:8000/api/programas').success(function(data) {

        $scope.desserts = data;
    });
  }

  $scope.success();
  
  $scope.onChange = function () {
    //
  };
  
  function getDesserts() {
    $scope.deferred = $scope.onChange();
  }
  
  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addItemController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'templates/add-item-dialog.html',
    }).then(getDesserts);
  };
  
  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { desserts: $scope.selected },
      templateUrl: 'templates/delete-dialog.html',
    }).then(getDesserts);
  };
  
  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';
    
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };
  
  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }
    
    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }
    
    if(!newValue) {
      $scope.query.page = bookmark;
    }
    
    getDesserts();
  });

}]);