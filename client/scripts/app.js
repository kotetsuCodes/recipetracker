'use strict';

require('angular');
require('angular-ui-router');
require('satellizer');
require('../styles/main.scss');

angular
  .module('carlpapaApp', [
    'ui.router',
    'satellizer'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
    
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
      .state('add', {
        url: '/add',
        templateUrl: 'views/add.html',
        controller: 'AddController'
      })
      .state(':id', {
        url: '/:id',
        templateUrl: 'views/modify.html',
        controller: 'ModifyController'
      });
  })
    .constant('myConfig', { 'backend':'http://localhost:9090/api/' });

require('./controllers/add');
require('./controllers/login');
require('./controllers/main');
require('./controllers/modify');
