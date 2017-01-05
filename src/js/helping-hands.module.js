(function() {
  'use strict';

  angular.module('helpingHands',['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider) {


    $stateProvider
      .state({
        name: 'home', //switch back to home
        url: '', //switch back to blank
        templateUrl: 'views/home.template.html',
        controller: 'AddressController',
        controllerAs: 'AddressController'


      })

      .state({
        name: 'addressMapView', //switch back to addressMapView
        url: '/addressMapView', //switch back to /adress
        templateUrl: 'views/map-view.template.html',
        controller: 'MapViewController',
        controllerAs: 'mapView',
        params: {
          address: null
        }

});


  }
}());
