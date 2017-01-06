(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressController', AddressController);

  AddressController.$inject = [ '$state'];

    function AddressController($state) {

      this.addressToAdd = {};

      this.addAddress = function addAddress(address) {
        $state.go('addressMapView', {address: address});

      };

    }

}());
