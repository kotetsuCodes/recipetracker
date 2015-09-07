'use strict';

angular.module('carlpapaApp')
	.controller('LoginController', function($scope, $http, $auth, $state, myConfig){

		$scope.login = function(){
			$auth.login({email: $scope.email, password: $scope.password}).then(function(data){
				console.log('request successful: ' + data);


				$state.go('main', {});
			});
	};

});
