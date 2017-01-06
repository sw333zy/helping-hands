(function() {
  'use strict';

  angular.module('helpingHands')
    .factory('DcHumanService', DcHumanService);

    DcHumanService.$inject = ['$http'];

    function DcHumanService($http) {

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

            var humanServicesData = {
              seniors: { type: 'FeatureCollection', features: []},
              parentResources: { type: 'FeatureCollection', features: [] },
              healthResources: { type: 'FeatureCollection', features: [] },
              fhg_FinacialResources: { type: 'FeatureCollection', features: [] },
              jobEducationAdult: { type: 'FeatureCollection', features: [] },
              crisisAbuseCounsel: { type: 'FeatureCollection', features: [] },
              generalEmergencyAsssistance: { type: 'FeatureCollection', features: [] },
              teenYouthResources: { type: 'FeatureCollection', features: [] },
              infoReferralLegal: { type: 'FeatureCollection', features: [] },
              irResources: { type: 'FeatureCollection', features: [] },
              dcFedResources: { type: 'FeatureCollection', features: [] }
              //features.properties['marker-symbol'] = 'car', features.properties['marker-size'] = 'small', features.properties['marker-symbol'] = '#ff4400'

            };

            //Filtering for Senior Resources

            humanServicesData.seniors.features = response.data.features.filter(function filterShelter(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              return entity.properties.KEYWORD.toLowerCase().indexOf('seniors') > -1;
            });


            //Filtering for Parental Resources

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

            //Filtering For Health Resources

            humanServicesData.healthResources.features = response.data.features.filter(function filterHealthResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('health care') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('health-clinics') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('aids') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('substance abuse') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            //Filtering for Food, Housing, and General Financial Assistance Resources

            humanServicesData.fhg_FinacialResources.features = response.data.features.filter(function filterFHG_FinacialResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }
              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('housing') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('clothing') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('food stamps') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('financial assistance general') > -1) {
                shouldInclude = true;
              }
              return shouldInclude;
            });

            //Filtering for Job Training and Adult Education Resources

            humanServicesData.jobEducationAdult.features = response.data.features.filter(function filterJobEducationAdult(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('employment-search/placement') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('education-vocational') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('adult education') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('training general') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('training-computer') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('computer training') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for Crisis Intervention, Abuse, and Counseling Resources

            humanServicesData.crisisAbuseCounsel.features = response.data.features.filter(function filterCrisisAbuseCounsel(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('battered individuals') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('crisis intervention') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-emotional') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-emotional') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-adult') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abuse-elder') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('abusers') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('counseling') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for General Emergency Assistance Resources

            humanServicesData.generalEmergencyAsssistance.features = response.data.features.filter(function filterGeneralEmergencyAssistance(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('emergency assistance - general') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('utility assistance') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('temporary assistance') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering for Teen and Youth Resources

            humanServicesData.teenYouthResources.features = response.data.features.filter(function filterTeenYouthResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('at-risk youth') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen parents') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('runaways') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('teen development') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });
            //Filtering for Information, Referrals, and Legal Aid Resources

            humanServicesData.infoReferralLegal.features = response.data.features.filter(function filterInfoReferralLegal(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('information & referral') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('Social Service Referrals') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('legal-aid') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });
            //Filtering for Immigrant and Refugees Resources

            humanServicesData.irResources.features = response.data.features.filter(function filterIrResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('refugees') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('immigration') > -1) {
                shouldInclude = true;
              }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('immigrant services') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });

            //Filtering District and Federal Government Resources

            humanServicesData.dcFedResources.features = response.data.features.filter(function filterDcFedResources(entity){
              if (!entity.properties.KEYWORD) {
                return false;
              }

              var shouldInclude = false;

              if (entity.properties.KEYWORD.toLowerCase().indexOf('dc government') > -1) {
                shouldInclude = true;
                }
              if (entity.properties.KEYWORD.toLowerCase().indexOf('federal government') > -1) {
                shouldInclude = true;
              }

              return shouldInclude;
            });



            return humanServicesData;
        });

      }
  }

}());
