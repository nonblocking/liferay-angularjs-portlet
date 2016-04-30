
angular.module('nonblocking.ng1.portletDemo.routerView', [])

    .directive('routerView', function(router) {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.getTemplateUrl = function() {
                    return router.getTemplateUrl();
                }
            },
            template: ' <div ng-include="getTemplateUrl()"></div>'
        }
    });