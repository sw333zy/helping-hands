(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcOpenDataService'];

    function AddressMapViewController($stateParams, CurrentAddressService, DcOpenDataService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};

      this.getServices = function getServices(){
        console.log('trying to get DC service data');

        DcOpenDataService.getServices()
          .then(function success(data){
            console.log('we have DC services data', data);
          })
          .catch(function fail(err){
            console.log('the DC services data call failed', err);
          });
      };

      this.getServices();
  }

}());
