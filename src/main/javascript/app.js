

angular.module('angularjsPortletDemo', ['angularjsPortletDemoBackend'])

    .controller('MainController', function ($scope, backend, templates, authenticatedUser) {
        $scope.authenticatedUser = authenticatedUser;
        $scope.entriesPerPage = 10;
        $scope.currentPage = 0;
        $scope.totalEntries = 0;
        $scope.users = [];
        $scope.selectedUser = {};

        $scope.currentTemplate = templates[0];

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
                $scope.refreshUsers();
            }
        };

        $scope.previousPage = function() {
            if (!$scope.isFirstPage()) {
                $scope.currentPage -= 1;
                $scope.refreshUsers();
            }
        };

        $scope.refreshUsers = function() {
            backend.userListPromise( $scope.currentPage * $scope.entriesPerPage, $scope.entriesPerPage)
                .success(function(data) {
                    $scope.totalEntries = data.total;
                    $scope.users = data.users;
                }).error(function(data, status) {
                    alert("Error: " + data);
                });
        };

        $scope.showList = function() {
            $scope.currentTemplate = templates[0];
            $scope.selectedUser = {};
        };

        $scope.showDetails = function(userId) {
            $scope.currentTemplate = templates[1];

            backend.userDetailPromise(userId)
                .success(function(data) {
                    $scope.selectedUser = data;
                }).error(function(data, status) {
                    alert("Error: " + data);
                });
        };

        $scope.refreshUsers();
    })

    .factory('templates', function(portletAppContextPath) {
        return [
            { "name": "User List", url: portletAppContextPath + "templates/userList.html" },
            { "name": "User Detail", url: portletAppContextPath + "templates/userDetail.html" }
        ];
    });
