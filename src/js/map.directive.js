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



    //Senior toggle function

      function toggleMap(scope, element) {
        var map;
        console.log("Starting watch");
        scope.$watch('showSeniorResources', function toggleSeniorLayer(newValue, oldValue){
          console.log("triggered watch", newValue, oldValue);
          var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
          if(newValue){
            console.log(newValue, 'plotting seniors');
            getSeniorResources();
          } else{
            map.featureLayer.clearLayers(geojson);
          }
        });
        scope.$watch('showParentResources', function toggleParentLayer(newValue, oldValue){
          console.log("triggered watch", newValue, oldValue);
          var geojson = L.mapbox.tileLayer('mapbox.run-bike-hike');
          if(newValue){
            console.log(newValue, 'plotting parents');
            getParentResources();
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
      function getSeniorResources(){
        DcHumanService.getHumanServices()
        .then(function handleSuccess(data){
          console.log(data, 'dc data from caller');


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
          console.log(data, 'dc data from caller');


          map.featureLayer.setGeoJSON(data.parentResources);
          

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
