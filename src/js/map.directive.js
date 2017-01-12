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
