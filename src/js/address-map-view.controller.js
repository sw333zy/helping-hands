(function() {
  'use strict';

  angular.module('helpingHands')
    .controller('AddressMapViewController', AddressMapViewController);

    AddressMapViewController.$inject = ['$stateParams', 'CurrentAddressService', 'DcOpenDataService'];

    function AddressMapViewController($stateParams, CurrentAddressService, DcOpenDataService) {

      console.log("AddressMapViewController", $stateParams.address);
      CurrentAddressService.addAddress($stateParams.address);
      this.goToAddress = {};
      this.Dcdata = function DcData(){
        console.log(DcOpenDataService.DcData());
        DcOpenDataService.DcData()
        .then(function success(data){
          console.log(data);
        })
        .catch(function fail(xhr){
          console.log(xhr);
        });
        this.Dcdata();

      };
  }

}());
