(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'DcHumanService'];

    function MapViewController($stateParams, DcHumanService) {



      //toggle filter for Shelter Resources
      this.shelterToggle = false;
      this.parentsToggle = false;


      this.toggle = function toggle(toggler) {
        // if (toggler === 'shelters') {
        //   this.shelterToggle = !this.shelterToggle;
        // } else if (toggler === 'parents') {
        //   this.parentsToggle = !this.parentsToggle;
        // }
        this.shelterToggle = true;
        this.parentsToggle = true;

        var togglerBuild = toggler + 'Toggle';
        console.log(togglerBuild);
        this[togglerBuild] = !this[togglerBuild];

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
