(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcOpenDataService', DcOpenDataService);

    DcOpenDataService.$inject = ['$http'];

    function DcOpenDataService($http) {
      console.log('dc open data service');

      return {
        DcData: DcData
      };

      function DcData(){
        return $http({
            url: 'http://opendata.dc.gov/datasets/47be87a68e7a4376a3bdbe15d85de398_6.geojson', //need query and api key
            method: 'GET'
        })
        .then(function onlyReturnData(data) {
            console.log(data);

            return data.data;
        });

      }
  }

}());
