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

            var humanServicesData = {
              shelters: { type: 'FeatureCollection', features: [] },
              parentResources: { type: 'FeatureCollection', features: [] }
            };

            humanServicesData.shelters.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              return entity.properties.KEYWORD.toLowerCase().indexOf('shelter') > -1;
            });

            humanServicesData.parentResources.features = response.data.features.filter(function filterParentResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('child development') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('early intervention') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('education-early childhood') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('childcare-infants') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('after school programs') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen parents/pregnancy') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-education') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-services') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('parenting-skills') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('wic') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            return humanServicesData;
        });

      }
  }

}());
