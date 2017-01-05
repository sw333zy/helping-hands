(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcHumanService'];

    function MapViewController($stateParams, CurrentAddressService, DcHumanService) {

      console.log("MapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      //toggle filter for Senior Resources
      this.seniorsToggle = false;
      this.parentsToggle = false;

      this.toggle = function toggle() {
      console.log('do i work');
      this.seniorsToggle = !this.seniorsToggle;
      this.parentsToggle = !this.parentsToggle;
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

      this.getHumanServices();
  }

}());
