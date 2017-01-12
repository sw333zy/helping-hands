(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'DcHumanService'];

    function MapViewController($stateParams, DcHumanService) {


      this.toggle = function toggle(toggler) {

        this.shelterToggle = false;
        this.parentsToggle = false;
        this.healthToggle = false;
        this.fhgToggle = false;
        this.adultEdToggle = false;
        this.crisisToggle = false;
        this.emergencyToggle = false;
        this.teenToggle = false;
        this.infoToggle = false;
        this.irResourcesToggle = false;
        this.dcFedResourcesToggle = false;

        var togglerBuild = toggler + 'Toggle';
        console.log('what are we toggling', togglerBuild, this[togglerBuild]);
        this[togglerBuild] = !this[togglerBuild];
        console.log('after toggling, ', togglerBuild,' is', this[togglerBuild]);
      };

      //Getting data
      this.getHumanServices = function getHumanServices(){

        DcHumanService.getHumanServices()
          .then(function success(data){
            console.log('we have DC services data', data);
          })
          .catch(function fail(err){
            console.log('the DC services data call failed', err);
          });
      };
  }

}());
