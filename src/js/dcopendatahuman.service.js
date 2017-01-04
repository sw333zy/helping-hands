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
              return entity.properties.KEYWORD.toLowerCase().indexOf('shelter', 'homeless') > -1;
            });

            humanServicesData.parentResources.features = response.data.features.filter(function filterParentResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;
              
              if (entity.properties.KEYWORD.toLowerCase().indexOf('child development') > -1) {
                shouldInclude = true;
              }

              // , 'early intervention',
              // 'education-early childhood','childcare-infants',
              // 'after school programs', 'teen parents/pregnancy',
              // 'parenting-education', 'parenting-services',
              // 'parenting-skills' ) > -1;

              return shouldInclude
            });

            return humanServicesData;
        });

      }
  }

}());
