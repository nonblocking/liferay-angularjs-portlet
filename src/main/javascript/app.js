

angular.module('nonblocking.ng1.portletDemo', [
    'nonblocking.ng1.portletDemo.mainController',
    'nonblocking.ng1.portletDemo.userListController',
    'nonblocking.ng1.portletDemo.userDetailController',
    'nonblocking.ng1.portletDemo.router',
    'nonblocking.ng1.portletDemo.routerView' ])

    .config(function(routerProvider, portletConfig) {

        routerProvider.setTemplates([
            { name: "userList", url: portletConfig.portletAppContextPath + "templates/userList.html" },
            { name: "userDetail", url: portletConfig.portletAppContextPath + "templates/userDetail.html" }
        ]);
    });