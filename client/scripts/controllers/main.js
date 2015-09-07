'use strict';

angular.module('carlpapaApp')
  .controller('MainController', function ($scope, $http, $location, myConfig) {

    $scope.listRecipes = function() {
      $location.path('ListRecipes');
    }

  $scope.addRecipe = function() {
    $location.path('AddRecipe');
  };

  $scope.addShoppingList = function() {
    $location.path('AddShoppingList');
  }

});
