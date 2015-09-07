'use strict';

angular.module('carlpapaApp')
  .controller('AddShoppingListController', function ($scope, $http, $location, myConfig) {

  $scope.addedRecipes = [];
  $scope.shoppingListName = '';

  $http.get(myConfig.backend + 'recipe')
    .success(function(data) {
      $scope.recipes = [];

        for(var i=0;i<data.length;i++) {
          $scope.recipes.push({ data: data[i] });
        }

    });

  $scope.addRecipeToList = function(recipe) {
    for(var i=0;i<$scope.recipes.length;i++) {
      if($scope.recipes[i].data.name == recipe) {
        $scope.addedRecipes.push($scope.recipes[i]);
      }
    }
  }


  $scope.saveShoppingList = function() {
    if($scope.addedRecipes.length > 0 && $scope.shoppingListName != '') {
      $http.post('http://localhost:9090/api/shoppinglist', { name: $scope.shoppingListName, recipes: $scope.addedRecipes})
        .success(function(data) {
          //$location.path();
        });
    }
  };

});
