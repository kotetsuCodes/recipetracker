'use strict';

angular.module('carlpapaApp')
  .controller('AddShoppingListController', function ($scope, $http, $location, myConfig) {

  $scope.addedRecipes = [];
  $scope.shoppingListName = '';

  $http.get(myConfig.backend + 'recipe')
    .success(function(data) {
      $scope.recipes = data;
    });

  $scope.addRecipeToList = function(recipe) {
    for(var i=0;i<$scope.recipes.length;i++) {
      if($scope.recipes[i].name == recipe) {
        $scope.addedRecipes.push($scope.recipes[i]);
      }
    }
  }

  $scope.removeRecipeFromList = function(recipe) {
    $scope.addedRecipes.splice(recipe, 1);
  }

  $scope.saveShoppingList = function() {
    if($scope.addedRecipes.length > 0 && $scope.shoppingListName != '') {
      $http.post(myConfig.backend + 'shoppinglist', { name: $scope.shoppingListName, recipes: $scope.addedRecipes})
        .success(function(data) {
          $location.path('/ShoppingLists');
        });
    }
  };

});
