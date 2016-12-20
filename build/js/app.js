(function() {
  'use strict';

  angular.module('helpingHands',['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider) {


    $stateProvider
      .state({
        name: 'home',
        url: '',
        templateUrl: 'views/home.template.html'

      });


  }
}());

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
