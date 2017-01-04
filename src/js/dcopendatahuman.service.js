(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcHumanService', DcHumanService);

    DcHumanService.$inject = ['$http'];

    function DcHumanService($http) {
      console.log('dc open data service');

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
            console.log(response);
            var keyWordFilter = [];
            var frequency = {};

            var humanServicesData = {
              shelters: { type: 'FeatureCollection', features: [] },
              clinics: { type: 'FeatureCollection', features: [] }
            };

            humanServicesData.shelters.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var keykey = entity.properties.KEYWORD.split('\-/s+');
              for (var i = 0; i < keykey.length; i++) {
                frequency[keykey[i]] = (frequency[keykey[i]] || 0) + 1;
              }
              // console.log('word freq', frequency);
              // keyWordFilter.push(entity.properties.KEYWORD);
              // console.log('keyWords', keyWordFilter);
              // 
              return entity.properties.KEYWORD.toLowerCase().indexOf('shelter') > -1;
            });

            humanServicesData.clinics.features = []; // do the same filtering here!
            console.log('keyWords', keyWordFilter);

            console.log('word freq', frequency);

            return humanServicesData;
        });

      }
  }

}());
