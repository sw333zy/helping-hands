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

      this.getServices = function getServices(){
        console.log('trying to get DC service data');

        DcOpenDataService.getServices()
          .then(function success(data){
            console.log('we have DC services data', data);
          })
          .catch(function fail(err){
            console.log('the DC services data call failed', err);
          });
      };

      this.getServices();
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
        getServices: getServices
      };

      /**
       * [getServices description]
       * @return {Promise} [description]
       */
      function getServices(){
        return $http({
            url: 'http://opendata.dc.gov/datasets/87c5e68942304363a4578b30853f385d_25.geojson',
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

  MapBox.$inject = ['DcOpenDataService'];

  function MapBox(DcOpenDataService) {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';

        var map = L.mapbox.map(element[0], 'mapbox.streets')
          .setView([38.9, -77], 12)
          .addLayer(L.mapbox.tileLayer('mapbox.streets'));


        DcOpenDataService.getServices()
        .then(function handleSuccess(data){
          console.log(data, 'dc data from caller');

            map.featureLayer.setGeoJSON(data);
            map.featureLayer.eachLayer(function (entity) {

              entity.bindPopup(
                'Name:' +
                ' ' +
                entity.feature.properties.NAME +
                '<br\> Address:' +
                ' ' +
                entity.feature.properties.ADDRESS +
                '<br\> Phone:' +
                ' ' +
                entity.feature.properties.PH_NUM +
                '<br\> Proprietor:' +
                ' ' +
                entity.feature.properties.OWNERSHIP
              );
              // entity.on('click', function(){
              //   this.openPopup();
              // });
            });



        })
        .catch(function handleError(err){
           console.log(err);
        });




      }


    };

  }

}());
