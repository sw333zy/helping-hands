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
              shelter: { type: 'FeatureCollection', features: []},
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
              //features.properties['marker-symbol'] = 'car', features.properties['marker-size'] = 'small', features.properties['marker-symbol'] = '#ff4400'

            };

            //Filtering for Shelters and Homeless Resources

            humanServicesData.shelter.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('shelter') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('homeless') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
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

    MapViewController.$inject = ['$stateParams', 'DcHumanService'];

    function MapViewController($stateParams, DcHumanService) {



      //toggle filter for Shelter Resources
      this.shelterToggle = false;
      this.parentsToggle = false;


      this.toggle = function toggle(toggler) {
        // if (toggler === 'shelters') {
        //   this.shelterToggle = !this.shelterToggle;
        // } else if (toggler === 'parents') {
        //   this.parentsToggle = !this.parentsToggle;
        // }
        this.shelterToggle = true;
        this.parentsToggle = true;

        var togglerBuild = toggler + 'Toggle';
        console.log(togglerBuild);
        this[togglerBuild] = !this[togglerBuild];

      };

      //Getting data
      this.getHumanServices = function getHumanServices(){

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
        showShelterResources: '=shelter',
        showParentResources: '=parents'
      },
      link: toggleMap
    };

    //Shelter

    function toggleMap(scope, element) {
      var map;
      scope.$watch('showShelterResources', function toggleShelterLayer(newValue){
        console.log('toggled shelter watch');
        var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
        if(newValue){
          getShelterResources();
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
      function getShelterResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.shelter);
          console.log(data.shelter);
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
