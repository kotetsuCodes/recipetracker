'use strict';

angular.module('carlpapaApp')
  .controller('ListRecipesController', function ($scope, $http, $location, myConfig) {
    $http.get(myConfig.backend + 'recipe')
      .success(function(data) {
        console.log(data);
        $scope.recipes = data;
      });

    $scope.modifyRecipe = function(name) {
      $location.path('/recipe/' + name);
    };

    $scope.addRecipe = function() {
      $location.path('AddRecipe');
    };

  });
