'use strict';

angular.module('carlpapaApp')
  .controller('ListRecipesController', function ($scope, $http, $location, myConfig) {
    $http.get(myConfig.backend + 'recipe')
      .success(function(data) {
        $scope.recipes = [];

          for(var i=0;i<data.length;i++){
            $scope.recipes.push({ data: data[i] });
          }

      });

    $scope.modifyRecipe = function(name) {
      $location.path(name);
    };

  });
