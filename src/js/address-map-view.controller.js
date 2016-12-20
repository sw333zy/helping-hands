(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams'];

    function AddressMapViewController($stateParams) {

      console.log("AddressMapViewController", $stateParams.address);
      this.goToAddress = {};



    }


}());
