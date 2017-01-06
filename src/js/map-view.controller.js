(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcHumanService'];

    function MapViewController($stateParams, CurrentAddressService, DcHumanService) {

      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      //toggle filter for Senior Resources
      this.seniorsToggle = false;
      this.parentsToggle = false;

      // this.showGroup = function showGroup(group) {
      //   console.log('group is', group);
      // };

      this.toggle = function toggle(toggler) {
        // if (toggler === 'seniors') {
        //   this.seniorsToggle = !this.seniorsToggle;
        // } else if (toggler === 'parents') {
        //   this.parentsToggle = !this.parentsToggle;
        // }
        this.seniorsToggle = false;
        this.parentsToggle = false;

        var togglerBuild = toggler + 'Toggle';
        console.log(togglerBuild);
        this[togglerBuild] = !this[togglerBuild];
        
      };

      //Getting data
      this.getHumanServices = function getHumanServices(){
        // console.log('trying to get DC service data');

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
