(function() {
  'use strict';

  angular.module('helpingHands',['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider) {



    $stateProvider
      .state({
        name: 'home',
        url: '',
        templateUrl: 'views/home.template.html',



      })

      .state({
        name: 'addressMapView',
        url: '/addressMapView',
        templateUrl: 'views/map-view.template.html',
        controller: 'MapViewController',
        controllerAs: 'mapView',
        params: {
          address: null
        }

});


  }
}());
