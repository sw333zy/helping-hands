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
        url: '/addressMapView',
        templateUrl: 'views/address-map-view.template.html',
        controller: 'AddressMapViewController',
        controllerAs: 'addressMapView',
        params: {
          address: null
        }

});


  }
}());

(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams'];

    function AddressMapViewController($stateParams) {

      console.log("AddressMapViewController", $stateParams.address);
      this.goToAddress = {};



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
        $state.go('addressMapView', {address: address});

      };

    }

}());

(function() {
  'use strict';

  angular.module('helpingHands')
    .directive('mapbox', MapBox);


    function MapBox() {
      return {
        restrict: 'EA',
        link: function (scope, element) {
          L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';
          L.mapbox.map(element[0], 'mapbox.streets')
            .setView([38.9072, -77.0369], 9);
        }
      };
    }

}());
