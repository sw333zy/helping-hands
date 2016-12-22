(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcOpenDataService', DcOpenDataService);

    DcOpenDataService.$inject = ['$http'];

    function DcOpenDataService($http) {
      console.log('dc open data service');

      return {
        getServices: getServices
      };

      /**
       * [getServices description]
       * @return {Promise} [description]
       */
      function getServices(){
        return $http({
            url: 'http://opendata.dc.gov/datasets/87c5e68942304363a4578b30853f385d_25.geojson',
            method: 'GET'
        })
        .then(function onlyReturnData(data) {
            console.log(data);

            return data.data;
        });

      }
  }

}());
