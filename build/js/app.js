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

(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressController', AddressController);

  AddressController.$inject = [ '$state'];

    function AddressController($state) {

      this.addressToAdd = {};

      this.addAddress = function addAddress(address) {
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


        return {
            addAddress: addAddress
        };

        /**
         * Get address from api call
         * @return {Promise}     the completed ajax call promise
         */
        function addAddress(address) {
          var street = address.street;
          var city = address.city;
          var state = address.state;
          var zip = address.zip;

          var addressToPass = [street , city , state , zip].join("+");
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

            var humanServicesData = {
              seniors: { type: 'FeatureCollection', features: [] },
              parentResources: { type: 'FeatureCollection', features: [] },
              healthResources: { type: 'FeatureCollection', features: [] },
              fhg_FinacialResources: { type: 'FeatureCollection', features: [] },
              jobEducationAdult: { type: 'FeatureCollection', features: [] },
              crisisAbuseCounsel: { type: 'FeatureCollection', features: [] },
              generalEmergencyAsssistance: { type: 'FeatureCollection', features: [] },
              teenYouthResources: { type: 'FeatureCollection', features: [] },
              infoReferralLegal: { type: 'FeatureCollection', features: [] },
              irResources: { type: 'FeatureCollection', features: [] },
              dcFedResources: { type: 'FeatureCollection', features: [] }

            };

            //Filtering for Senior Resources

            humanServicesData.seniors.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              return entity.properties.KEYWORD.toLowerCase().indexOf('seniors') > -1;
            });


            //Filtering for Parental Resources

            humanServicesData.parentResources.features = response.data.features.filter(function filterParentResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('child development') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('early intervention') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('education-early childhood') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('childcare-infants') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('after school programs') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen parents/pregnancy') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-education') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-services') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-skills') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('wic') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            //Filtering For Health Resources

            humanServicesData.healthResources.features = response.data.features.filter(function filterHealthResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('health care') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('health-clinics') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('aids') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('substance abuse') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            //Filtering for Food, Housing, and General Financial Assistance Resources

            humanServicesData.fhg_FinacialResources.features = response.data.features.filter(function filterFHG_FinacialResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('housing') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('clothing') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('food stamps') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('financial assistance general') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            //Filtering for Job Training and Adult Education Resources

            humanServicesData.jobEducationAdult.features = response.data.features.filter(function filterJobEducationAdult(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('employment-search/placement') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('education-vocational') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('adult education') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('training general') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('training-computer') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('computer training') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for Crisis Intervention, Abuse, and Counseling Resources

            humanServicesData.crisisAbuseCounsel.features = response.data.features.filter(function filterCrisisAbuseCounsel(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('battered individuals') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('crisis intervention') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-emotional') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-emotional') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-adult') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-elder') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abusers') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('counseling') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for General Emergency Assistance Resources

            humanServicesData.generalEmergencyAsssistance.features = response.data.features.filter(function filterGeneralEmergencyAssistance(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('emergency assistance - general') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('utility assistance') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('temporary assistance') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for Teen and Youth Resources

            humanServicesData.teenYouthResources.features = response.data.features.filter(function filterTeenYouthResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('at-risk youth') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen parents') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('runaways') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen development') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });
            //Filtering for Information, Referrals, and Legal Aid Resources

            humanServicesData.infoReferralLegal.features = response.data.features.filter(function filterInfoReferralLegal(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('information & referral') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('Social Service Referrals') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('legal-aid') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });
            //Filtering for Immigrant and Refugees Resources

            humanServicesData.irResources.features = response.data.features.filter(function filterIrResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('refugees') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('immigration') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('immigrant services') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering District and Federal Government Resources

            humanServicesData.dcFedResources.features = response.data.features.filter(function filterDcFedResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('dc government') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('federal government') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });



            return humanServicesData;
        });

      }
  }

}());

(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcHumanService'];

    function MapViewController($stateParams, CurrentAddressService, DcHumanService) {

      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      //toggle filter for Senior Resources
      this.seniorsToggle = false;
      this.parentsToggle = false;

      this.showGroup = function showGroup(group) {
        console.log('group is', group);
      }

      this.toggle = function toggle(toggler) {
        // if (toggler === 'seniors') {
        //   this.seniorsToggle = !this.seniorsToggle;
        // } else if (toggler === 'parents') {
        //   this.parentsToggle = !this.parentsToggle;
        // }
        var togglerBuild = toggler + 'Toggle';
        console.log(togglerBuild);
        this[togglerBuild] = !this[togglerBuild];
      };

      //Getting data
      this.getHumanServices = function getHumanServices(){
        // console.log('trying to get DC service data');

        DcHumanService.getHumanServices()
          .then(function success(data){
            console.log('we have DC services data', data);
          })
          .catch(function fail(err){
            console.log('the DC services data call failed', err);
          });
      };
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
      scope: {
        showSeniorResources: '=seniors',
        showParentResources: '=parents'
      },
      link: toggleMap
    };

    //Senior

    function toggleMap(scope, element) {
      var map;
      scope.$watch('showSeniorResources', function toggleSeniorLayer(newValue){
        console.log('toggled senior watch');
        var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
        if(newValue){
          getSeniorResources();
        } else{
          map.featureLayer.clearLayers(geojson);
        }
      });
    //Parents
      scope.$watch('showParentResources', function toggleParentLayer(newValue){
        console.log('toggled parent watch');
        var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
        if(newValue){
          getParentResources();
        } else{
          map.featureLayer.clearLayers(geojson);
        }
      });
    //


      //Setting Map

      L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';
      map = L.mapbox.map(element[0], 'mapbox.run-bike-hike')
      .setView([38.9, -77], 12)
      .addLayer(L.mapbox.tileLayer('mapbox.run-bike-hike'));


      //Function for the toggle
      function getSeniorResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.seniors);
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
              entity.feature.properties.PHONE +
              '<br\> Website:' +
              ' ' +
              entity.feature.properties.WEB_URL +
              '<br\> Description:' +
              ' ' + entity.feature.properties.DESCRIPTION
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }

      //Function for Toggle
      function getParentResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.parentResources);
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
              entity.feature.properties.PHONE +
              '<br\> Website:' +
              ' ' +
              entity.feature.properties.WEB_URL +
              '<br\> Description:' +
              ' ' + entity.feature.properties.DESCRIPTION
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
  }
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
