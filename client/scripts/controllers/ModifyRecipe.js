'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:ModifyController
 * @description
 * # MainController
 * Controller of the carlpapaApp
 */
 angular.module('carlpapaApp')
 	.controller('ModifyRecipeController', function($scope, $location, $timeout, $state, $stateParams, $http, myConfig){
		$http.get('http://localhost:9090/api/recipe/' + $stateParams.id)
			.success(function(data){

				$scope.ButtonMsg = "Save Recipe";

				$scope.title = data.name;
				$scope.name = data.name;
				$scope.ingredients = [];
				$scope.instructions = data.instructions;

				if(angular.isArray(data.ingredients)){

					for(var item=0;item<data.ingredients.length;item++){
						$scope.ingredients.push({ name: data.ingredients[item].name });
				 	}

				 	$scope.ingredients.push({ name: ""});

				} else {
					$scope.ingredients.push({ name: data.ingredients});
					$scope.ingredients.push({ name: ""});
				}

			 });

			 $scope.modifyRecipe = function(){
			 	var newIngredients = [];
			 	var recipeCompleted = false;

			 	if($scope.name != null && $scope.name != ''){

					for(var x=0;x < $scope.ingredients.length; x++){

						if($scope.ingredients[x].name != '' && $scope.ingredients[x].name != null && $scope.instructions != null && $scope.instructions != ''){
				 			newIngredients.push({ name: $scope.ingredients[x].name });

				 		}


					}

					if(newIngredients.length > 0){

				 		$('.submitButton').hide();

							$http.put(myConfig.backend + 'recipe/' + $stateParams.id, {name: $scope.name, ingredients: newIngredients, instructions: $scope.instructions})
						 		.success(function(data){
						 			$scope.ButtonMsg = "Recipe Saved!";

						 			$timeout(function() {
					 					$location.path('/ListRecipes');
						 			}, 2000);

						 		});
				 		}
				}

			 };


			$scope.appendIngredient = function(){

			 	if($scope.ingredients[$scope.ingredients.length - 1].name != null && $scope.ingredients[$scope.ingredients.length - 1].name != ''){
			 		$scope.ingredients.push({ name: "" });
			 	}
			};

			$scope.deleteRecipe = function(){
				$http.delete(myConfig.backend + 'recipe/' + $stateParams.id)
					.success(function(data){
							$location.path('/');
					});


			};

	 });
