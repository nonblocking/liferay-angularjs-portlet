
angular.module('nonblocking.ng1.portletDemo.mainController', [])

    .controller('MainController', function ($scope, router, portletConfig) {
        $scope.authenticatedUser = portletConfig.authenticatedUser;
        $scope.selectedUserId = null;

        $scope.showList = function() {
            router.goto('userList');
            $scope.selectedUserid = null;
        };

        $scope.showDetails = function(userId) {
            $scope.selectedUserId = userId;
            router.goto('userDetail');
        };

    });