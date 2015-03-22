

angular.module('angularjsPortletDemoBackend', [])

    .service('backend', function($http, ajaxUrl, isStandalone) {

        var portletBackend = {
            userListPromise: function(startIndex, limit) {
                return this._ajaxPost("userList", { "startIndex": startIndex, "limit": limit });
            },

            userDetailPromise: function(userId) {
                return this._ajaxPost("userDetail", { "userId": userId });
            },

            _ajaxPost: function(method, params){
                return $http({
                    url: ajaxUrl + "&p_p_resource_id=" + method,
                    method: 'POST',
                    params: params
                });
            }
        };

        var testBackend = {
            userListPromise: function(startIndex, limit) {
                var jsonFile = startIndex === 0 ? 'users.json' : 'users2.json';

                return $http({
                    url: ajaxUrl + jsonFile,
                    method: 'GET'
                });
            },

            userDetailPromise: function(userId) {
                return $http({
                    url: ajaxUrl + 'userDetails.json',
                    method: 'GET'
                });
            }
        };

        if (isStandalone) {
            return testBackend;
        } else {
            return portletBackend;
        }
    });