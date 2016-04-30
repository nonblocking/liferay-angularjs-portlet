
angular.module('nonblocking.ng1.portletDemo.userDetailController', [ 'nonblocking.ng1.portletDemo.backend' ])

    .controller('UserDetailController', function ($scope, backend) {
        $scope.selectedUser = null;

        $scope.loadDetails = function() {
            backend.userDetail($scope.selectedUserId).then(
                function(response) {
                    $scope.selectedUser = response.data;
                }, function(response) {
                    alert("Error: " + response.status);
                });
        };

        $scope.loadDetails();

    });