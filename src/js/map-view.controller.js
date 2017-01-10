(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'DcHumanService'];

    function MapViewController($stateParams, DcHumanService) {



      //toggle filter for Shelter Resources
      this.shelterToggle = false;
      this.parentsToggle = false;
      this.healthToggle = false;
      this.fhgToggle = false;
      this.adultEdToggle = false;
      this.crisisToggle = false;
      this.emergencyToggle = false;
      this.teenToggle = false;
      this.infoToggle = false;


      this.toggle = function toggle(toggler) {
        // if (toggler === 'shelters') {
        //   this.shelterToggle = !this.shelterToggle;
        // } else if (toggler === 'parents') {
        //   this.parentsToggle = !this.parentsToggle;
        // }

        var togglerBuild = toggler + 'Toggle';
        console.log('what are we toggling', togglerBuild, this[togglerBuild]);
        this[togglerBuild] = !this[togglerBuild];
        console.log('after toggling, infoToggle is', this['infoToggle']);
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
