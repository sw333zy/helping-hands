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
          console.log(data, 'dc data from call');

          map.featureLayer.setGeoJSON(data);

        })
        .catch(function handleError(err){
           console.log(err);
        });


      }
    };
  }

}());
