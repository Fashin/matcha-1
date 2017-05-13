// Define the `matcha` module
var matcha = angular.module('matcha', []);

// Define the `IndexController` controller on the `matcha` module
matcha.controller('IndexController', function IndexController($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});

matcha.controller('RegisterController', function RegisterController($scope) {
});
