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
        controller: 'AddressController',
        controllerAs: 'AddressController'


      })

      .state({
        name: 'addressMapView',
        url: '/addressMapView/',
        templateUrl: 'views/address-map-view.template.html',
        controller: 'AddressMapViewController',
        controllerAs: 'addressMapView'

});


  }
}());

(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressController', AddressController);

  AddressController.$inject = [ '$state'];

    function AddressController($state) {
      console.log('creating the controller');
      this.addressToAdd = {};

      this.addAddress = function addAddress(address) {
        console.log('somethings working', address);
        $state.go('addressMapView');

      };

    }
}());
