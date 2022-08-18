/*global module:false*/
module.exports = function (grunt) {
    var fs = require('fs');

    // grunt doesn't natively support reading config from .jshintrc yet
    var jshintOptions = JSON.parse(fs.readFileSync('./.jshintrc'));

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            file: "./index.js",
            options: {
                jshintrc: '.jshintrc'
            }
        },

        lint: {
            files: [
                'array.js'
            ]
        },

        it: {
            all: {
                src: 'test/**/*.test.js',
                options: {
                    timeout: 3000, // not fully supported yet
                    reporter: 'dotmatrix'
                }
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', 'index.js'],
                dest: '<%= pkg.name %>.min.js'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint it'
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                    ' Licensed <%= pkg.license %> */\n'
            },
            min: {
                files: {
                    '<%= pkg.name %>.min.js': ['index.js']
                }
            }
        }
    });

    grunt.registerTask("promises-aplus", "run promises a plus test", function () {
        var promisesAplusTests = require("promises-aplus-tests");

        promisesAplusTests(require("./test/aplus-adapter"), { reporter: "spec" }, this.async());
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'it', 'promises-aplus', 'uglify:min']);
    grunt.loadNpmTasks('grunt-it');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

};
