'use strict';

angular.module('myApp.modal', ['ngAnimate', 'ngMaterial']);
angular.module('myApp.modal').controller('ModalDemoCtrl', ['$scope', function($scope, $mdDialog, $log, $template) {

  $scope.verify = function() {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: $template,
      scope: $scope.$new(),
    })
    .then(function() {
        
     });
  };
}]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };  
}
