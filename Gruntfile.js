
var jsApp = [
    'src/main/javascript/app.js',
    'src/main/javascript/backend.js'
];

var jsVendor = [
    'bower_components/angular/angular.min.js'
];

module.exports = function(grunt) {

    grunt
        .initConfig({
            pkg : grunt.file.readJSON('package.json'),

            jshint : {
                src : [ 'Gruntfile.js', 'src/main/javascript/*.js' ]
            },

            sass: {
                dev: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        'src/main/webapp/css/app.css': 'src/main/sass/app.scss'
                    }
                },
                dist: {
                    options: {
                        style: 'compressed'
                    },
                    files: {
                        'src/main/webapp/css/app.css': 'src/main/sass/app.scss'
                    }
                }
            },

            concat : {
                jsVendor : {
                    src : jsVendor,
                    dest : 'src/main/webapp/js/vendor.js'
                },
                jsApp : {
                    src : jsApp,
                    dest : 'src/main/webapp/js/app.js'
                }
            },

            ngmin: {
                jsApp : {
                    src: 'src/main/webapp/js/app.js',
                    dest: 'src/main/webapp/js/app.js'
                }
            },

            uglify: {
                jsApp : {
                    files: {
                        'src/main/webapp/js/app.js': 'src/main/webapp/js/app.js'
                    }
                }
            },

            connect : {
                options : {
                    port : 9000,
                    hostname : 'localhost'
                },
                livereload : {
                    options : {
                        open : true,
                        base : [ 'src/main/webapp/' ]
                    }
                }
            },

            watch : {
                options : {
                    livereload : true
                },
                html : {
                    files : [ 'src/main/webapp/*.html' ]
                },
                css : {
                    files : [ 'src/main/sass/*.scss' ],
                    tasks : [ 'sass:dev' ]
                },
                js : {
                    files : [ 'src/main/javascript/*.js' ],
                    tasks : [ 'jshint', 'concat:jsApp' ]
                }
            }

        });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('server', function(target) {
        grunt.task.run([ 'jshint', 'sass:dev', 'concat:jsVendor', 'concat:jsApp', 'connect:livereload', 'watch']);
    });

    // Default task
    grunt.registerTask('default', [ 'jshint', 'sass:dev', 'concat:jsVendor', 'concat:jsApp'  ]);

    //Distribution task
    grunt.registerTask('dist', [  'jshint', 'sass:dist', 'concat:jsVendor', 'concat:jsApp', 'ngmin:jsApp', 'uglify:jsApp' ]);
};
