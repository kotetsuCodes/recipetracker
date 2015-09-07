'use strict';

angular.module('carlpapaApp')
	.controller('AddRecipeController', function($scope, $location, $http, myConfig) {
		$scope.ingredients = [{}];

		$scope.addRecipe = function() {
			var ingredients = [];
			var recipeCompleted = false;

			if($scope.name != null && $scope.name != '' && $scope.instructions != null && $scope.instructions != '') {

				for(var x=0;x < $scope.ingredients.length; x++) {

					if($scope.ingredients[x].name != '' && $scope.ingredients[x].name != null) {
			 			ingredients.push({ name: $scope.ingredients[x].name });
			 		}
				}

				if(ingredients.length > 0) {
					$http.post('http://localhost:9090/api/recipe', {name:$scope.name, ingredients: ingredients, instructions: $scope.instructions})
						.success(function(data) {
							$location.path('/');
						});
				}
			}
		};

		$scope.appendIngredient = function(){
			 		$scope.ingredients.push({ name: "" });
		};

		$scope.removeIngredient = function(ingredient) {
			if($scope.ingredients.length != 1) {
				$scope.ingredients.splice(ingredient, 1);
			}
		}

	});
