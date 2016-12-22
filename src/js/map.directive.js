(function() {
  'use strict';

  angular.module('helpingHands')
  .directive('mapbox', MapBox);


  function MapBox() {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';

        var map = L.mapbox.map(element[0], 'mapbox.streets')
        .setView([38.9, -77], 12)
        .addLayer(L.mapbox.tileLayer('mapbox.streets'));

        L.mapbox.featureLayer('http://opendata.dc.gov/datasets/87c5e68942304363a4578b30853f385d_25.geojson')
        .on('ready', function(e) {

          var clusterGroup = new L.MarkerClusterGroup();
          e.target.eachLayer(function(layer) {
            clusterGroup.addLayer(layer);
          });
          map.addLayer(clusterGroup);
        });
      }
    };
  }

}());
