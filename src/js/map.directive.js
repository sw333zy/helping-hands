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
