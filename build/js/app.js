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

            humanServicesData.irResources.features = response.data.features.filter(function filterirResources(entity){
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

            sessionStorage.setItem('humanServicesData', angular.toJson(humanServicesData));


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


      this.toggle = function toggle(toggler) {

        this.shelterToggle = false;
        this.parentsToggle = false;
        this.healthToggle = false;
        this.fhgToggle = false;
        this.adultEdToggle = false;
        this.crisisToggle = false;
        this.emergencyToggle = false;
        this.teenToggle = false;
        this.infoToggle = false;
        this.irResourcesToggle = false;
        this.dcFedResourcesToggle = false;

        var togglerBuild = toggler + 'Toggle';
        console.log('what are we toggling', togglerBuild, this[togglerBuild]);
        this[togglerBuild] = !this[togglerBuild];
        console.log('after toggling, ', togglerBuild,' is', this[togglerBuild]);
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
        showParentResources: '=parents',
        showHealthResources: '=health',
        showfhg_FinacialResources: '=fhg',
        showjobEducationAdult: '=adulted',
        showcrisisAbuseCounsel: '=crisis',
        showgeneralEmergencyAsssistance: '=emergency',
        showteenYouthResources: '=teen',
        showinfoReferralLegal: '=info',
        showirResources: '=irresources',
        showdcFedResources: '=dcfedresources'
        //in angular you camel case in the html you hyphinate
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
    //Health
    scope.$watch('showHealthResources', function toggleHealthLayer(newValue){
      console.log('toggled health watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getHealthResources();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //Food Housing General
    scope.$watch('showfhg_FinacialResources', function toggleFhgLayer(newValue){
      console.log('toggled fhg watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getfhg_FinacialResources();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //Adult Ed
    scope.$watch('showjobEducationAdult', function togglejobEducationAdultLayer(newValue){
      console.log('toggled adult education watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getjobEducationAdult();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //Crisis
    scope.$watch('showcrisisAbuseCounsel', function toggleAbuseCounselLayer(newValue){
      console.log('toggled abuse watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getcrisisAbuseCounsel();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //General Emergency Asssistance
    scope.$watch('showgeneralEmergencyAsssistance', function togglegeneralEmergencyAsssistanceLayer(newValue){
      console.log('toggled emergency watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getgeneralEmergencyAsssistance();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    // Teen
    scope.$watch('showteenYouthResources', function toggleteenYouthResourcesLayer(newValue){
      console.log('toggled teen watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getteenYouthResources();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //info
    scope.$watch('showinfoReferralLegal', function toggleinfoReferralLegalLayer(newValue){
      console.log('toggled info watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getinfoReferralLegal();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //immigrant resources
    scope.$watch('showirResources', function toggleirResourcesLayer(newValue){
      console.log('toggled ir immigrant resource watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getirResources();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });
    //dc n fed resources
    scope.$watch('showdcFedResources', function toggledcFedResourcesLayer(newValue){
      console.log('toggled fed watch');
      var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
      if(newValue){
        getdcFedResources();
      } else{
        map.featureLayer.clearLayers(geojson);
      }
    });




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
          console.log('shelter', data.shelter);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
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
          console.log('parent', data.parentResources);

          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getHealthResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.healthResources);
          console.log('health', data.healthResources);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getfhg_FinacialResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.fhg_FinacialResources);
          console.log('fhg', data.fhg_FinacialResources);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getjobEducationAdult(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.jobEducationAdult);
          console.log('adultEd', data.jobEducationAdult);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getcrisisAbuseCounsel(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.crisisAbuseCounsel);
          console.log('crisis', data.crisisAbuseCounsel);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getgeneralEmergencyAsssistance(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.generalEmergencyAsssistance);
          console.log('emergency', data.generalEmergencyAsssistance);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getteenYouthResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.teenYouthResources);
          console.log('teen', data.teenYouthResources);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getinfoReferralLegal(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.infoReferralLegal);
          console.log('info', data.infoReferralLegal);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getirResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.irResources);
          console.log('ir immigrant', data.irResources);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
            );
          });
        })
        .catch(function handleError(err){
          console.log(err);
        });
      }
      function getdcFedResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          map.featureLayer.setGeoJSON(data.dcFedResources);
          console.log('dcFed', data.dcFedResources);
          map.featureLayer.eachLayer(function (entity) {
            entity.bindPopup(
              '<b>Name:</b>' +
              ' ' +
              entity.feature.properties.NAME +
              '<br\> <b>Address:</b>' +
              ' ' +
              entity.feature.properties.ADDRESS +
              '<br\> <b>Phone:</b>' +
              ' ' +
              entity.feature.properties.PHONE +
              '<br\> <b>Website:</b>' +
              ' ' +
              '<a href="' + entity.feature.properties.WEB_URL + '">' +
              entity.feature.properties.WEB_URL +
              '</a>' +
              '<br\> <b>Description:</b>' +
              ' ' + entity.feature.properties.DESCRIPTION +
              '<br\> <b>Eligibility:</b>' +
              ' ' + entity.feature.properties.ELIGIBILITY +
              '<br\> <b>Business Hours:</b>' +
              ' ' + entity.feature.properties.BUSINESS_HOURS
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
