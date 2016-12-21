(function() {
  'use strict';

  angular.module('helpingHands')
    .directive('mapbox', MapBox);


    function MapBox() {
      return {
        restrict: 'EA',
        link: function (scope, element) {
          L.mapbox.accessToken = 'pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w';
          L.mapbox.map(element[0], 'mapbox.streets')
            .setView([38.9072, -77.0369], 9);
        }
      };
    }

}());
