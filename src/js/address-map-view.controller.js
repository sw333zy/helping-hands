(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcHumanService'];

    function AddressMapViewController($stateParams, CurrentAddressService, DcHumanService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      this.getHumanServices = function getHumanServices(){
        console.log('trying to get DC service data');

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
