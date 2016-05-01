
angular.module('nonblocking.ng1.portletDemo.userDetailController', [ 'nonblocking.ng1.portletDemo.backend' ])

    .controller('UserDetailController', function ($scope, backend, router) {
        $scope.selectedUser = null;

        $scope.showList = function() {
            router.goto('userList');
        };

        $scope.loadDetails = function() {
            backend.userDetail(router.getParams().selectedUserId).then(
                function(response) {
                    $scope.selectedUser = response.data;
                }, function(response) {
                    alert("Error: " + response.status);
                });
        };

        $scope.loadDetails();

    });