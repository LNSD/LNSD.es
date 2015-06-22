module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		// Variables
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			output: 'build'
		},
		bower: {
			js: {
				bootstrap: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
				jquery: 'bower_components/jquery/dist/jquery.min.js'
			}
		},

		// Grunt tasks
		clean: ['<%= dirs.output %>'],
		copy: {
			assets: { src: ['assets/*', '!assets/favicon.ico'], dest:'<%= dirs.output %>/assets/', expand: true, flatten: true },
			favicon: { src: 'assets/favicon.ico', dest: '<%= dirs.output %>/', expand: true, flatten: true },
			bootstrap: { src: '<%= bower.js.bootstrap %>', dest: '<%= dirs.output %>/js/', expand: true, flatten: true },
			jquery: { src: '<%= bower.js.jquery %>', dest: '<%= dirs.output %>/js/', expand: true, flatten: true }
		},
		jade: {
			build:{
				options: { pretty: true },
				files: { '<%= dirs.output %>/index.html': 'jade/index.jade' }
			}
		},
		sass: {
			build:{
				options: { style: 'expanded' },
				files: { '<%= dirs.output %>/styles/main.css': 'sass/*.scss' }
			}
		},
		coffee: {
			build: {
				options: {
					join: true,
					bare: true
				},
				files: { '<%= dirs.output %>/js/main.js': 'scripts/*.coffee' }
			}
		},
		watch: {
			jade: {
				files: '**/*.jade',
				tasks: ['jade']
			},
			sass: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			coffee: {
				files: '**/*.coffee',
				tasks: ['coffee']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('build', 'Compiles all of the source files and copies the assets to the build directory.', ['clean', 'copy', 'coffee', 'sass', 'jade']);
	grunt.registerTask('default', 'Compiles everything and copies it to build directory.', ['build']);
};