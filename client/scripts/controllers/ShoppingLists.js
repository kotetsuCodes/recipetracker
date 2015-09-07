'use strict';

angular.module('carlpapaApp')
  .controller('ShoppingListsController', function ($scope, $http, $location, myConfig) {
    $http.get(myConfig.backend + 'shoppinglist')
      .success(function(data) {
        $scope.shoppinglists = data;

          //for(var i=0;i<data.length;i++){
            //$scope.shoppinglists.push({ data: data[i] });
          //}

      });

    $scope.modifyShoppingList = function(name) {
      $location.path('/shoppinglist/' + name);
    };

    $scope.addShoppingList = function() {
      $location.path('AddShoppingList');
    }

  });
