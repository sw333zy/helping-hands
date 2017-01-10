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
                "OBJECTID": 1,
                "PROGRAM_ID": "DCAP0001AA",
                "AGENCY_ID": "DCAP0001",
                "NAME": "Washington Legal Clinic for the Homeless",
                "ADDRESS": "1200 U STREET NW",
                "ADDRESS2": null,
                "ZIPCODE": "20009",
                "AKA": "WLCH",
                "PHONE": "(202) 328-5500",
                "PHONE2": null,
                "PHONE3": null,
                "PHONE4": null,
                "PHONE5": null,
                "PHONE1_DESCRIPTION": "Main Number",
                "PHONE2_DESCRIPTION": null,
                "PHONE3_DESCRIPTION": null,
                "PHONE4_DESCRIPTION": null,
                "PHONE5_DESCRIPTION": null,
                "FAX": "(202) 328-5515",
                "WEB_URL": "http://www.legalclinic.org",
                "EMAIL": "washlch@erols.com",
                "BUSINESS_HOURS": "9:00 am - 5:30 pm, Monday - Friday (varies at each client site)",
                "ELIGIBILITY": "DC residents, homeless, or at risk of becoming homeless",
                "FEES": "No Fee",
                "INTAKE": "Telephone (for listing of current sites);  Walk-In (ask for the Legal Clinic staff)",
                "LANGUAGES": "English, Spanish (receptionist speaks Spanish)",
                "AREA_SERVED": "District of Columbia",
                "DOCUMENTATION": null,
                "DIRECTIONS": "Metro Rail Stop:  U Street/Cardozo (Green Line); Metro Bus Route:  90's",
                "TRANSPORTATION": null,
                "QUADRANT": "NW",
                "PAYMENT_METHODS": "No Payment,",
                "VOLUNTEER_OPPORTUNITIES": null,
                "SEASON_START_DATE": null,
                "SEASON_END_DATE": null,
                "WAIT_LIST_PERIOD": null,
                "HANDICAP": "Outside Ramps, Elevators or None Needed",
                "PUBLIC_RECORD": 1,
                "SEARCHABLE_AREA": "*DC_______",
                "DIRECTOR": "Patricia Mullahy Fugere",
                "TITLE": "Executive Director",
                "WEB_WARD": null,
                "DESCRIPTION": "Provides free legal services to those who are homeless or at risk of becoming homeless. Provides intake services at area shelters and community organizations.  Offers legal advice on matters such as landlord tenant issues, subsidized housing, food Stamps",
                "ADDRESS_ID": 240812,
                "KEYWORD": "Legal-Representation"
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  -77.02833266827645,
                  38.91674698226081
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "OBJECTID": 3,
                "PROGRAM_ID": "DCAP0004AA",
                "AGENCY_ID": "DCAP0004",
                "NAME": "Adoption Center of Washington",
                "ADDRESS": "1726 M STREET NW",
                "ADDRESS2": "Suite 1101",
                "ZIPCODE": "20036",
                "AKA": "ACW",
                "PHONE": "(202) 452-8278",
                "PHONE2": null,
                "PHONE3": null,
                "PHONE4": "(800) 452-3676",
                "PHONE5": null,
                "PHONE1_DESCRIPTION": "Intake Number",
                "PHONE2_DESCRIPTION": null,
                "PHONE3_DESCRIPTION": null,
                "PHONE4_DESCRIPTION": "Toll Free Number",
                "PHONE5_DESCRIPTION": null,
                "FAX": "(202) 452-8280",
                "WEB_URL": null,
                "EMAIL": "linda@adoptioncenter.com",
                "BUSINESS_HOURS": "9:00 am - 5:00 pm, Monday - Friday; Some Tuesday Evenings",
                "ELIGIBILITY": "Prospective parents must be between the ages 25-50, single or married",
                "FEES": "Initial meeting is free; Classes charge a $4,000 agency fee; Checks accepted.",
                "INTAKE": "Telephone, By Appointment",
                "LANGUAGES": "Russian, Chinese",
                "AREA_SERVED": "District of Columbia",
                "DOCUMENTATION": "None",
                "DIRECTIONS": "Metro Rail Stop: 1 block from Farragut North (Red line)",
                "TRANSPORTATION": null,
                "QUADRANT": "NW",
                "PAYMENT_METHODS": "Other,",
                "VOLUNTEER_OPPORTUNITIES": null,
                "SEASON_START_DATE": null,
                "SEASON_END_DATE": null,
                "WAIT_LIST_PERIOD": 180,
                "HANDICAP": "Indoor Wheelchair, Elevators or None Needed",
                "PUBLIC_RECORD": 1,
                "SEARCHABLE_AREA": null,
                "DIRECTOR": "Linda Brownlee",
                "TITLE": "Executive Director",
                "WEB_WARD": null,
                "DESCRIPTION": "Seeks to improve the quality of life and expand the opportunities of orphans through adoption. This is a licensed non-profit child-placing agency committed to ethical practices. Creates and sponsors parent education programs and provides support and guid",
                "ADDRESS_ID": 241792,
                "KEYWORD": "Adoption"
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  -77.03938880775043,
                  38.90540776942205
                ]
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
          expect(data.features[0].properties.NAME).to.equal("Washington Legal Clinic for the Homeless");
          expect(data.features[0].properties.ADDRESS).to.equal("1200 U STREET NW");
          expect(data.features[0].properties.ZIPCODE).to.equal('20009');
          expect(data.features[0].properties.EMAIL).to.equal("washlch@erols.com");
          expect(data.features[0].properties.KEYWORD).to.equal('Legal-Representation');
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
