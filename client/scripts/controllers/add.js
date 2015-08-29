'use strict';

/**
 * @ngdoc function
 * @name carlpapaApp.controller:AddController
 * @description
 * # AddController
 * Controller of the carlpapaApp
 */

module.exports = angular.module('carlpapaApp')
	.controller('AddController', function($scope, $location, $http, myConfig){
		$scope.ingredients = [{}];

		$scope.addRecipe = function(){
			var ingredients = [];
			var recipeCompleted = false;

			if($scope.name != null && $scope.name != '' && $scope.instructions != null && $scope.instructions != ''){

				for(var x=0;x < $scope.ingredients.length; x++){

					if($scope.ingredients[x].name != '' && $scope.ingredients[x].name != null){
			 			ingredients.push({ name: $scope.ingredients[x].name });	

			 		} 
			 		

				}

				if(ingredients.length > 0){

					$('.submitButton').hide();
					$http.post('http://localhost:9090/api/recipe', {name:$scope.name, ingredients: ingredients, instructions: $scope.instructions})
						.success(function(data){
							console.log('Recipe was added');
							$location.path('/');						

						});
				}
				

			}

			

		};

		$scope.appendIngredient = function(){

			 	if($scope.ingredients[$scope.ingredients.length - 1].name != null && $scope.ingredients[$scope.ingredients.length - 1].name != ''){
			 		$scope.ingredients.push({ name: "" });			 	
			 	}
		};
		
	});