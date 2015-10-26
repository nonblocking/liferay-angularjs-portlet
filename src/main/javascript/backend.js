

angular.module('angularjsPortletDemoBackend', [])

    .factory('backend', function($http, $httpParamSerializerJQLike, ajaxUrl, isStandalone) {

        var PortletBackend = function() {
            this.userListPromise = function(startIndex, limit) {
                return ajaxPost("userList", { "startIndex": startIndex, "limit": limit });
            };

            this.userDetailPromise = function(userId) {
                return ajaxPost("userDetail", { "userId": userId });
            };

            function ajaxPost(method, data){
                return $http({
                    url: ajaxUrl + "&p_p_resource_id=" + method,
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializerJQLike(data)
                });
            }
        };

        var TestBackend = function() {
            this.userListPromise = function(startIndex, limit) {
                var jsonFile = startIndex === 0 ? 'users.json' : 'users2.json';

                return $http({
                    url: ajaxUrl + jsonFile,
                    method: 'GET'
                });
            };

            this.userDetailPromise = function(userId) {
                return $http({
                    url: ajaxUrl + 'userDetails.json',
                    method: 'GET'
                });
            };
        };

        if (isStandalone) {
            return new TestBackend();
        } else {
            return new PortletBackend();
        }
    });