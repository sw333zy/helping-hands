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
