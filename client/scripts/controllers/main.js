'use strict';

 module.exports = angular.module('carlpapaApp')
  .controller('MainController', function ($scope, $http, $location, myConfig) {
    $http.get(myConfig.backend + 'recipe')
      .success(function(data){
        $scope.recipes = [];
        
          for(var i=0;i<data.length;i++){
            $scope.recipes.push({ data: data[i] });
          }
                    
      });

  	$scope.add = function(){      
  		$location.path('add');
  	};

    $scope.modifyRecipe = function(recipeName){
      $location.path(recipeName);
    };

  });
