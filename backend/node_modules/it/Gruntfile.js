/*global module:false*/
module.exports = function (grunt) {
    var fs = require('fs');

    // grunt doesn't natively support reading config from .jshintrc yet
    var jshintOptions = JSON.parse(fs.readFileSync('./.jshintrc'));

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            file: "./lib/**/*.js",
            options: {
                jshintrc: '.jshintrc'
            }
        },

        browserify: {
            'it.js': {
                src: ['lib/browser/it.js'],
                ignore: [
                    'lib/formatters/coverage.js',
                    'lib/formatters/coverage-html.js',
                    'lib/formatters/doc.js',
                    'lib/formatters/dot.js',
                    'lib/formatters/spec.js',
                    'lib/formatters/tap.js'
                ],
                dest: 'it.js'
            }
        },

        uglify: {
            options: {
                report: "gzip",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                    ' Licensed <%= pkg.license %> */\n'
            },
            min: {
                files: {
                    '<%= pkg.name %>.min.js': ['it.js']
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

};
