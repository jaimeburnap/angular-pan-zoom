'use strict';

module.exports = function (grunt) {
	// Load npm plugins to provide necessary tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	// configurable paths
	var yeomanConfig = {
		scripts: 'scripts',
		release: 'release'
	};

	try {
		yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
	} catch (e) {
	}

	grunt.initConfig({
		yeoman: yeomanConfig,
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				ignores: [
					'Gruntfile.js'
				]
			},
			all: {
				src: [
					'Gruntfile.js',
					'**/*.js'
				]
			}
		},
		clean: {
			all: ['release/*', 'release/**/*']
		},
		concat: {
			depsJs: {
				files: {
					'release/panzoom.js': ['scripts/directives/*.js', 'scripts/services/*.js']
				}
			}
		},
		uglify: {
			depsJs: {
				files: {
					'release/panzoom.min.js': 'release/panzoom.js'
				}
			}
		},
		sass: {
			dist: {
				files: {
					'release/panzoomwidget.css': 'scss/panzoomwidget.scss'
				}
			}
		}
	});

	// Default task to be run.
	grunt.registerTask('default', [
		'clean',
		'concat',
		'uglify',
		'sass'
	]);

	grunt.registerTask('hint', [
		'newer:jshint'
	]);
};
