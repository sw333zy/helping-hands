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

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcHumanService'];

    function AddressMapViewController($stateParams, CurrentAddressService, DcHumanService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      this.getHumanServices = function getHumanServices(){
        console.log('trying to get DC service data');

        DcHumanService.getHumanServices()
          .then(function success(data){
            console.log('we have DC services data', data);
          })
          .catch(function fail(err){
            console.log('the DC services data call failed', err);
          });
      };

      this.getHumanServices();
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
                console.log('data from current address', response);

                return response.data;
            });
        }
    }

})();

(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcHumanService', DcHumanService);

    DcHumanService.$inject = ['$http'];

    function DcHumanService($http) {
      console.log('dc open data service');

      return {
        getHumanServices: getHumanServices
      };

      /**
       * [getHumanServices description]
       * @return {Promise} [description]
       */
      function getHumanServices(){
        return $http({
            url: 'http://opendata.dc.gov/datasets/2867206451704e84b5480af8e3c314be_8.geojson',
            method: 'GET'
        })
        .then(function onlyReturnData(response) {
            console.log(response);

            var humanServicesData = {
              shelters: { type: 'FeatureCollection', features: [] },
              parentResources: { type: 'FeatureCollection', features: [] }
            };

            humanServicesData.shelters.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              return entity.properties.KEYWORD.toLowerCase().indexOf('shelter', 'homeless') > -1;
            });

            humanServicesData.parentResources.features = response.data.features.filter(function filterParentResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;
              
              if (entity.properties.KEYWORD.toLowerCase().indexOf('child development') > -1) {
                shouldInclude = true;
              }

              // , 'early intervention',
              // 'education-early childhood','childcare-infants',
              // 'after school programs', 'teen parents/pregnancy',
              // 'parenting-education', 'parenting-services',
              // 'parenting-skills' ) > -1;

              return shouldInclude
            });

            return humanServicesData;
        });

      }
  }

}());

(function() {
  'use strict';

  angular.module('helpingHands')
  .directive('mapbox', MapBox);

  MapBox.$inject = ['DcHumanService'];

  function MapBox(DcHumanService) {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';

        var map = L.mapbox.map(element[0], 'mapbox.streets')
          .setView([38.9, -77], 12)
          .addLayer(L.mapbox.tileLayer('mapbox.streets'));


        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          console.log(data, 'dc data from caller');


            map.featureLayer.setGeoJSON(data.shelters);

            // this won't work... we need to figure out how to add multiple layers!
            // map.featureLayer.setGeoJSON(data.parentResources);

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

            });

        })
        .catch(function handleError(err){
           console.log(err);
        });




      }


    };

  }

}());
// map.featureLayer.on('ready', function(e) {
//
//   var clusterGroup = new L.MarkerClusterGroup();
//   e.target.eachLayer(function(layer) {
//     clusterGroup.addLayer(layer);
//   });
//   map.addLayer(clusterGroup);
// });
