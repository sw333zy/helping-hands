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
          features:[
          {
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
                "KEYWORD": "vikings"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "KEYWORD": "null"
              }
            }

          ]
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

      result
        .then(function(data) {
          expect(data).to.be.an('object');
          expect(data.features).to.be.an('array');
          expect(data.features.length).to.equal(10);
          expect(data.features[0].properties.KEYWORD).to.equal('shelter');
          expect(data.features[0].geometry.coordinates).to.be.an('array');

          doneCallback();
        })
        .catch(function(err) {
          console.log(err);
          doneCallback();
        });

      $httpBackend.flush();
    });

  });
}());
