'use strict';

angular.module('carlpapaApp')
  .controller('MainController', function ($scope, $http, $location, myConfig) {

    $scope.listRecipes = function() {
      $location.path('ListRecipes');
    }

  $scope.shoppingLists = function() {
    $location.path('ShoppingLists');
  }

});
