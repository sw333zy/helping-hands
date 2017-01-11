(function() {
  'use strict';

  var expect = chai.expect;

  describe('dc human services data', function() {
    var DcHumanService;
    var $httpBackend;


    beforeEach(module('helpingHands'));

    beforeEach(inject(function(_$httpBackend_, _DcHumanService_) {
      $httpBackend = _$httpBackend_;
      DcHumanService = _DcHumanService_;

      $httpBackend
        .whenGET('http://opendata.dc.gov/datasets/2867206451704e84b5480af8e3c314be_8.geojson')
        .respond({
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "shelter"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "childcare-infants"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "aids"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "food stamps"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "adult education"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "abuse-emotional"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "utility assistance"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "runaways"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "legal-aid"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "immigration"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "dc government"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "adoption"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "refugees"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "null"
              }
            }
      ]
    });
      $httpBackend
        .whenGET('views/home.template.html')
        .respond('we have human services');
    }));

    it('should get dc human service data', function(doneCallback) {
      var result = DcHumanService.getHumanServices();
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');

      console.log('do i get here');

      result
        .then(function(data) {
          expect(data).to.be.an('object');
          expect(data.shelter).to.be.an('object');
          expect(data.shelter.features).to.be.an('array');
          expect(data.shelter.features.length).to.equal(1);
          expect(data.shelter.features[0].properties.KEYWORD).to.equal('shelter');
          expect(data.parentResources).to.be.an('object');
          expect(data.parentResources.features).to.be.an('array');
          expect(data.parentResources.features.length).to.equal(1);
          expect(data.parentResources.features[0].properties.KEYWORD).to.equal('childcare-infants');
          expect(data.healthResources).to.be.an('object');
          expect(data.healthResources.features).to.be.an('array');
          expect(data.healthResources.features.length).to.equal(1);
          expect(data.healthResources.features[0].properties.KEYWORD).to.equal('aids');
          expect(data.fhg_FinacialResources).to.be.an('object');
          expect(data.fhg_FinacialResources.features).to.be.an('array');
          expect(data.fhg_FinacialResources.features.length).to.equal(1);
          expect(data.fhg_FinacialResources.features[0].properties.KEYWORD).to.equal('food stamps');
          expect(data.jobEducationAdult).to.be.an('object');
          expect(data.jobEducationAdult.features).to.be.an('array');
          expect(data.jobEducationAdult.features.length).to.equal(1);
          expect(data.jobEducationAdult.features[0].properties.KEYWORD).to.equal('adult education');
          expect(data.crisisAbuseCounsel).to.be.an('object');
          expect(data.crisisAbuseCounsel.features).to.be.an('array');
          expect(data.crisisAbuseCounsel.features.length).to.equal(1);
          expect(data.crisisAbuseCounsel.features[0].properties.KEYWORD).to.equal('abuse-emotional');
          expect(data.generalEmergencyAsssistance).to.be.an('object');
          expect(data.generalEmergencyAsssistance.features).to.be.an('array');
          expect(data.generalEmergencyAsssistance.features.length).to.equal(1);
          expect(data.generalEmergencyAsssistance.features[0].properties.KEYWORD).to.equal('utility assistance');
          expect(data.teenYouthResources).to.be.an('object');
          expect(data.teenYouthResources.features).to.be.an('array');
          expect(data.teenYouthResources.features.length).to.equal(1);
          expect(data.teenYouthResources.features[0].properties.KEYWORD).to.equal('runaways');

          // ..... do the same for each type


          doneCallback();
        })
        .catch(function(err) {
          doneCallback(err.message);
        });

      $httpBackend.flush();
    });

  });
}());
