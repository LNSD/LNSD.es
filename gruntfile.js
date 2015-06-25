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

		// Grunt build tasks
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
				files: {
                    '<%= dirs.output %>/index.html': 'templates/index.jade',
                    '<%= dirs.output %>/404.html': 'templates/404.jade'
                }
			}
		},
		sass: {
			build:{
				options: { style: 'expanded' },
				files: {
                    '<%= dirs.output %>/styles/main.css': 'styles/main.scss',
                    '<%= dirs.output %>/styles/404.css': 'styles/404.scss'
                }
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.config('responsive_images', {
        options: {
            engine:'im',
            sizes: [
                { name: 'xs', width: 480 },
                { name: 'sm', width: 768 },
                { name: 'md', width: 992 },
                { name: "lg", width: 1200 }
            ]
        },
        assets: { src: 'assets/*.{gif,png,jpg,jpeg}', dest:'<%= dirs.output %>/assets/', expand: true, flatten: true }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        options: {
            livereload: true
        },
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
    });

	grunt.registerTask('build', 'Compiles all of the source files and copies the assets to the build directory.', ['clean', 'copy', 'responsive_images', 'coffee', 'sass', 'jade']);
	grunt.registerTask('default', 'Compiles everything and copies it to build directory.', ['build']);
};