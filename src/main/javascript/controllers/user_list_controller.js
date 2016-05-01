


angular.module('nonblocking.ng1.portletDemo.userListController', [ 'nonblocking.ng1.portletDemo.backend' ])

    .controller('UserListController', function ($scope, backend, router) {
        $scope.entriesPerPage = 10;
        $scope.currentPage = 0;
        $scope.totalEntries = 0;
        $scope.users = [];

        $scope.totalPages = function() {
            return Math.floor($scope.totalEntries / $scope.entriesPerPage) + 1;
        };

        $scope.isLastPage = function() {
            return $scope.totalEntries < ($scope.currentPage + 1) * $scope.entriesPerPage;
        };

        $scope.isFirstPage = function() {
            return $scope.currentPage === 0;
        };

        $scope.nextPage = function() {
            if (!$scope.isLastPage()) {
                $scope.currentPage += 1;
                $scope.loadUsers();
            }
        };

        $scope.previousPage = function() {
            if (!$scope.isFirstPage()) {
                $scope.currentPage -= 1;
                $scope.loadUsers();
            }
        };

        $scope.showDetails = function(userId) {
            router.goto('userDetail', {
                selectedUserId: userId
            });
        };

        $scope.loadUsers = function() {
            backend.userList( $scope.currentPage * $scope.entriesPerPage, $scope.entriesPerPage).then(
                function(response) {
                    $scope.totalEntries = response.data.total;
                    $scope.users = response.data.users;
                }, function(response) {
                    alert("Error: " + response.status);
                });
        };

        $scope.loadUsers();

    });