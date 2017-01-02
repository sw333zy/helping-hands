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
          console.log(data, 'dc data from caller');

            map.featureLayer.setGeoJSON(data);
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
              // entity.on('click', function(){
              //   this.openPopup();
              // });
            });



        })
        .catch(function handleError(err){
           console.log(err);
        });




      }


    };

  }

}());
