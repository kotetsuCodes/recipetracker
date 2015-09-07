'use strict';

//require('angular');
//require('angular-ui-router');
//require('satellizer');
//require('../styles/main.scss');

angular
  .module('carlpapaApp', [
    'ui.router',
    'satellizer'
  ])

  .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $authProvider) {

    $authProvider.loginUrl = 'http://localhost:9090/api/authenticate';
    $authProvider.authHeader = 'authorization';
    $authProvider.authToken = '';

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .state('ListRecipes', {
        url: '/ListRecipes',
        templateUrl: 'views/ListRecipes.html',
        controller: 'ListRecipesController'
      })
      .state('AddRecipe', {
        url: '/AddRecipe',
        templateUrl: 'views/AddRecipe.html',
        controller: 'AddRecipeController'
      })
      .state('AddShoppingList', {
        url: '/AddShoppingList',
        templateUrl: 'views/AddShoppingList.html',
        controller: 'AddShoppingListController'
      })
      .state('ShoppingLists', {
        url: '/ShoppingLists',
        templateUrl: 'views/ShoppingLists.html',
        controller: 'ShoppingListsController'
      })
      .state('shoppinglist/:id', {
        url: '/shoppinglist/:id',
        templateUrl: 'views/ModifyShoppingList.html',
        controller: 'ModifyShoppingListController'
      })
      .state('recipe/:id', {
        url: '/recipe/:id',
        templateUrl: 'views/ModifyRecipe.html',
        controller: 'ModifyRecipeController'
      });

      //$locationProvider.html5Mode(true);

  })
    .constant('myConfig', { 'backend':'http://localhost:9090/api/' });
