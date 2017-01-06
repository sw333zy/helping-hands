(function() {
    'use strict';

    angular.module('helpingHands')
        .factory('CurrentAddressService', CurrentAddressService);

    CurrentAddressService.$inject = [ '$http' ];

    function CurrentAddressService($http) {


        return {
            addAddress: addAddress
        };

        /**
         * Get address from api call
         * @return {Promise}     the completed ajax call promise
         */
        function addAddress(address) {
          var street = address.street;
          var city = address.city;
          var state = address.state;
          var zip = address.zip;

          var addressToPass = [street , city , state , zip].join("+");
            return $http({
                url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(addressToPass) + '.json?access_token=pk.eyJ1Ijoic3czMzN6eSIsImEiOiJjaXdzMnluaXUxM3hwMnRzN3I4cHl2bnBnIn0.MhLpogI8pC6zp8qUBMID0w', //need query and api key
                method: 'GET'
            })
            .then(function onlyReturnData(response) {
                console.log('data from current address', response);

                return response.data;
            });
        }
    }

})();
