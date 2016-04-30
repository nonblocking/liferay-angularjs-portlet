

angular.module('nonblocking.ng1.portletDemo.backend', [])

    .factory('backend', function($http, $httpParamSerializerJQLike, portletConfig) {

        var PortletBackend = function() {
            this.userList = function(startIndex, limit) {
                return ajaxPost("userList", { "startIndex": startIndex, "limit": limit });
            };

            this.userDetail = function(userId) {
                return ajaxPost("userDetail", { "userId": userId });
            };

            function ajaxPost(method, data){
                return $http({
                    url: portletConfig.ajaxUrl + "&p_p_resource_id=" + method,
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializerJQLike(data)
                });
            }
        };

        var TestBackend = function() {
            this.userList = function(startIndex, limit) {
                var jsonFile = startIndex === 0 ? 'users.json' : 'users2.json';

                return $http({
                    url: portletConfig.ajaxUrl + jsonFile,
                    method: 'GET'
                });
            };

            this.userDetail = function(userId) {
                return $http({
                    url: portletConfig.ajaxUrl + 'userDetails.json',
                    method: 'GET'
                });
            };
        };

        if (portletConfig.isStandalone) {
            return new TestBackend();
        } else {
            return new PortletBackend();
        }
    });