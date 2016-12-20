(function() {
  'use strict';

  angular.module('helpingHands')
        .controller('AddressController', AddressController);

    AddressController.$inject = [ '$stateParams', '$state'];

        function AddressController() {
            console.log('creating the controller');
            this.address = {};


        }

}());
