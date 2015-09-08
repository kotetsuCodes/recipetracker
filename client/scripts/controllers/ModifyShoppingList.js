'use strict';

angular.module('carlpapaApp')
  .controller('ModifyShoppingListController', function ($scope, $location, $timeout, $state, $stateParams, $http, myConfig) {

  $scope.ButtonMsg = "Save Shopping List";
  $scope.addedRecipes = [];
  $scope.shoppingListName = '';

  $http.get(myConfig.backend + 'shoppinglist/' + $stateParams.id)
    .success(function(data) {
      $scope.shoppingListName = data.name;
      $scope.addedRecipes = data.recipes;
    });

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
      $http.put(myConfig.backend + 'shoppinglist/' + $stateParams.id, { name: $scope.shoppingListName, recipes: $scope.addedRecipes})
        .success(function(data) {
          $scope.ButtonMsg = "Shopping List Saved!";
          $timeout(function() {
            $location.path('/ShoppingLists');
          }, 2000);
        });
    }
  };

});
