(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressController', AddressController);

  AddressController.$inject = [ '$state'];

    function AddressController($state) {
      console.log('creating the controller');

      this.addressToAdd = {};

      this.addAddress = function addAddress(address) {
        console.log('somethings working', address);
        $state.go('addressMapView', {address: address});

      };

    }

}());
