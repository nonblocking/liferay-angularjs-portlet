
angular.module('nonblocking.ng1.portletDemo.mainController', [])

    .controller('MainController', function ($scope, router, portletConfig) {
        $scope.authenticatedUser = portletConfig.authenticatedUser;
     
    });