(function() {
  'use strict';

  var expect = chai.expect;

  describe('MapViewController', function() {
    var MapViewController;
    var mockDcHumanService = {};

    beforeEach(module('helpingHands'));

    beforeEach(module(function($provide) {
      $provide.value('DcHumanService', mockDcHumanService);
    }));

    beforeEach(inject(function($controller, $q) {
      mockDcHumanService.getHumanServices = function() {
        return $q.resolve({
          features: [
            {
              "type": "Feature",
              "properties": {
                "OBJECTID": 321,
                "PROGRAM_ID": "DCAP0111AA",
                "AGENCY_ID": "DCAP0111",
                "NAME": "The Alexander Social Services Corporation",
                "ADDRESS": "4614 BENNING ROAD SE",
                "ADDRESS2": "# 103",
                "ZIPCODE": "20019",
                "AKA": "TASSC",
                "PHONE": "(202) 724-3932",
                "PHONE2": "(202) 863-1370",
                "PHONE3": "(202) 583-1152",
                "PHONE4": null,
                "PHONE5": null,
                "PHONE1_DESCRIPTION": "Intake and Assessment",
                "PHONE2_DESCRIPTION": "Intake and Assessment",
                "PHONE3_DESCRIPTION": "Program",
                "PHONE4_DESCRIPTION": null,
                "PHONE5_DESCRIPTION": null,
                "FAX": "(202) 583-1174",
                "WEB_URL": null,
                "EMAIL": "alexsjj@aol.com",
                "BUSINESS_HOURS": "Open 24 hours (Residential facility)",
                "ELIGIBILITY": "Homeless families, referred by Virginia Williams Family Resource Center",
                "FEES": "None",
                "INTAKE": "Referral Required (from intake unit at Virginia Williams Family Resource Center)",
                "LANGUAGES": "English",
                "AREA_SERVED": "District of Columbia",
                "DOCUMENTATION": "Referral",
                "DIRECTIONS": "Metro Rail Stop: Benning Road/ East Capitol Station; Metro Bus Route: W-2, stops in front of the building",
                "TRANSPORTATION": null,
                "QUADRANT": "NE",
                "PAYMENT_METHODS": "No Payment,",
                "VOLUNTEER_OPPORTUNITIES": null,
                "SEASON_START_DATE": null,
                "SEASON_END_DATE": null,
                "WAIT_LIST_PERIOD": null,
                "HANDICAP": null,
                "PUBLIC_RECORD": 1,
                "SEARCHABLE_AREA": null,
                "DIRECTOR": "Shella Alexander",
                "TITLE": "Program Director",
                "WEB_WARD": null,
                "DESCRIPTION": "Provides temporary emergency shelter and social services for homeless families.  Referrals accepted from Virginia Williams Family Resource Center only.",
                "ADDRESS_ID": 147600,
                "KEYWORD": "Shelter-Emergency, Families"
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  -76.93581776982244,
                  38.8865676691192
                ]
              }
            }
          ]
        });
      };
      MapViewController = $controller('MapViewController');
    }));

    it('should have the correct scope variables', function() {
      expect(MapViewController.shelterToggle).to.be.a('boolean');
      expect(MapViewController.shelterToggle).to.equal(false);

    });
    it('should show shelter data when toggled', function() {
      MapViewController.toggle('shelter');
      var shelter = MapViewController.shelterToggle;
      expect(shelter).to.equal(true);
    });

  });
}());
