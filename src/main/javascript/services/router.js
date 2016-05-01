

angular.module('nonblocking.ng1.portletDemo.router', [])

    .provider('router', function() {

        var templates = [];
        var currentTemplate = null;
        var params = null;

        this.config = function(ts) {
            templates = ts;
            if (!currentTemplate && templates && templates.length > 0) {
                currentTemplate = templates[0];
            }
        };

        this.$get = function() {
            return {
                goto: function (name, ps) {
                    angular.forEach(templates, function (template) {
                        if (template.name === name) {
                            currentTemplate = template;
                        }
                    });
                    if (ps) {
                        params = ps;
                    } else {
                        params = {};
                    }
                },

                getParams: function() {
                    return params;
                },

                getTemplateUrl: function () {
                    return currentTemplate.url;
                }
            }
        };
    });
