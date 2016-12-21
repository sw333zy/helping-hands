(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService'];

    function AddressMapViewController($stateParams, CurrentAddressService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};



    }


}());
