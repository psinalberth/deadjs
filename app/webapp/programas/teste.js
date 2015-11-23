'use strict';

angular.module('myApp.modal', ['ngAnimate', 'ngMaterial']);
angular.module('myApp.modal').controller('ModalDemoCtrl', function($scope, $mdDialog, $log) {

  $scope.verify = function($titulo, $template) {

    console.log($scope.programa);

    $scope.titulo = $titulo;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: $template,
      scope: $scope.$new(),
    })
    .then(function() {
        
     });
  };
});

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

  $scope.$on('update', function() {
    $mdDialog.cancel();
  });  
}
