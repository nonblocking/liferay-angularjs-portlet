

angular.module('angularjs-portlet', [])

    .controller('MainController', function ($scope, backend) {

        $scope.authenticatedUser = angularJsPortletAuthenticatedUser;

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
            backend.usersPromise( $scope.currentPage * $scope.entriesPerPage, $scope.entriesPerPage)
                .success(function(data) {
                    $scope.totalEntries = data.total;
                    $scope.users = data.users;
                }).error(function(data, status) {
                    alert("Error: " + data);
                });
        };

        $scope.refreshUsers();
    })

    .factory('backend', function($http) {

        var portletBackend = {
            usersPromise: function(startIndex, limit) {
                return this._ajaxPost("users", { "startIndex": startIndex, "limit": limit });
            },

            _ajaxPost: function(method, params){
                return $http({
                    url: angularJsPortletAjaxURL + "&p_p_resource_id=" + method,
                    method: 'POST',
                    params: params
                });
            }
        };

        var testBackend = {
            usersPromise: function(startIndex, limit) {
                var params = { "startIndex": startIndex, "limit": limit };
                var jsonFile = startIndex === 0 ? "users.json" : "users2.json";

                return $http({
                    url: angularJsPortletAjaxURL + jsonFile,
                    method: 'GET',
                    params: params
                });
            }
        };

        if (angularJsPortletStandalone) {
            return testBackend;
        } else {
            return portletBackend;
        }
    });