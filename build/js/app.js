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

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcOpenDataService'];

    function AddressMapViewController($stateParams, CurrentAddressService, DcOpenDataService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};
      this.Dcdata = function DcData(){
        console.log(DcOpenDataService.DcData());
        DcOpenDataService.DcData()
        .then(function success(data){
          console.log(data);
        })
        .catch(function fail(xhr){
          console.log(xhr);
        });

      };
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
        .factory('CurrentAddressService', CurrentAddressService);

    CurrentAddressService.$inject = [ '$http' ];

    function CurrentAddressService($http) {
        console.log('creating service');


        return {
            addAddress: addAddress
        };

        /**
         * Get address from api call
         * @return {Promise}     the completed ajax call promise
         */
        function addAddress(address) {
          var street = address.street;
          console.log(street);
          var city = address.city;
          var state = address.state;
          var zip = address.zip;

          var addressToPass = [street , city , state , zip].join("+");
          console.log(addressToPass);
          console.log(encodeURI(addressToPass));
            return $http({
                url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(addressToPass) + '.json?access_token=pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w', //need query and api key
                method: 'GET'
            })
            .then(function onlyReturnData(response) {
                console.log(response);

                return response.data;
            });
        }
    }

})();

(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcOpenDataService', DcOpenDataService);

    DcOpenDataService.$inject = ['$http'];

    function DcOpenDataService($http) {
      console.log('dc open data service');

      return {
        DcData: DcData
      };

      function DcData(){
        return $http({
            url: 'http://opendata.dc.gov/datasets/47be87a68e7a4376a3bdbe15d85de398_6.geojson', //need query and api key
            method: 'GET'
        })
        .then(function onlyReturnData(data) {
            console.log(data);

            return data.data;
        });

      }
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
