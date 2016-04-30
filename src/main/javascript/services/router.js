

angular.module('nonblocking.ng1.portletDemo.router', [])

    .provider('router', function() {

        var templates = [];
        var currentTemplate = null;

        this.setTemplates = function(ts) {
            templates = ts;
            if (!currentTemplate && templates && templates.length > 0) {
                currentTemplate = templates[0];
            }
        };

        this.$get = function() {
            return {
                goto: function (name) {
                    angular.forEach(templates, function (template) {
                        if (template.name === name) {
                            currentTemplate = template;
                        }
                    });
                },

                getTemplateUrl: function () {
                    return currentTemplate.url;
                }
            }
        };
    });
