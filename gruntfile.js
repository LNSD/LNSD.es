module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		// Variables
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			output: 'build',
            sources: 'content'
		},
		bower: {
			js: {
				bootstrap: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
				jquery: 'bower_components/jquery/dist/jquery.min.js',
                moment: 'bower_components/moment/min/moment.min.js'
			},
            fonts: {
                fa: 'bower_components/components-font-awesome/fonts/'
            }

		},

		// Grunt build tasks
		clean: ['<%= dirs.output %>'],
		copy: {
			assets: { src: ['assets/*', '!assets/favicon.ico', '!assets/*.{guf,png,jpg,jpeg}'], dest:'<%= dirs.output %>/assets/', expand: true, flatten: true },
			favicon: { src: 'assets/favicon.ico', dest: '<%= dirs.output %>/fonts/', expand: true, flatten: true },
            fawesome: { src: '<%= bower.fonts.fa %>/*.{eot,svg,ttf,woff,woff2}', dest: '<%= dirs.output %>/assets/fonts/', expand: true, flatten: true },
            bootstrap: { src: '<%= bower.js.bootstrap %>', dest: '<%= dirs.output %>/js/vendor/', expand: true, flatten: true },
            jquery: { src: '<%= bower.js.jquery %>', dest: '<%= dirs.output %>/js/vendor/', expand: true, flatten: true },
            moment: { src: '<%= bower.js.moment %>', dest: '<%= dirs.output %>/js/vendor/', expand: true, flatten: true }
		},
		jade: {
			build:{
				options: {
                    pretty: true,
                    data: {
                        name: "<%= pkg.name %>",
                        desc: "<%= pkg.description %>",
                        author: "<%= pkg.author %>"
                    }
                },
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
                    '<%= dirs.output %>/css/main.css': 'styles/main.scss'
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

    // Metalsmith blog task
    grunt.loadNpmTasks('grunt-metalsmith');
    grunt.config('metalsmith', {
        blog:{
            options: {
                metadata: {
                    name: "<%= pkg.name %>",
                    desc: "<%= pkg.description %>",
                    author: "<%= pkg.author %>",
                    baseuri: "<%= pkg.homepage %>",
                    disqus: "<%= pkg.disqus %>",
                    analytics: "<%= pkg.analytics %>",
                    moment: require('moment')
                },
                plugins: grunt.file.readJSON('metalsmith.json')
            },
            src: '<%= dirs.sources %>',
            dest: '<%= dirs.output %>/blog'
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.config('responsive_images', {
        options: {
            engine:'im'
        },
        assets: {
            options: {
                sizes: [
                    { name: 'xs', width: 480 },
                    { name: 'sm', width: 768 },
                    { name: 'md', width: 992 },
                    { name: "lg", width: 1200 }
                ]
            },
            files: [{
                src: 'assets/*.{gif,png,jpg,jpeg}',
                dest:'<%= dirs.output %>/assets/',
                expand: true,
                flatten: true
            }]
        },
        blog: {
            options: {
                sizes: [
                    { name: 'xs', width: 480 },
                    { name: 'sm', width: 768 },
                    { name: 'md', width: 992 },
                    { name: "lg", width: 1200 }
                ]
            },
            files: [{
                expand: true,
                cwd: '<%= dirs.sources %>/',
                src: ['./**/*.{gif,png,jpg,jpeg}', '!./**/header.{jpg,jpeg}'],
                dest: '<%= dirs.output %>/blog/posts/'
            }]
        },
        fbshare: {
            options: {
                sizes: [{ name: 'fb', width: 200, height: 200, aspectRatio: false }]
            },
            files: [{
                expand: true,
                cwd: '<%= dirs.sources %>/',
                src: ['./**/header.{jpg,jpeg}'],
                dest: '<%= dirs.output %>/blog/posts/'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        options: {
            livereload: true
        },
        jade: {
            files: ['templates/layout.jade', 'templates/index.jade', 'templates/404.jade', 'templates/partials/*.jade'],
            tasks: ['jade']
        },
        sass: {
            files: 'styles/**/*.scss',
            tasks: ['sass']
        },
        coffee: {
            files: 'scripts/**/*.coffee',
            tasks: ['coffee']
        },
        metalsmith: {
            files: ['metalsmith.json', 'templates/layout.jade', 'templates/blog.jade', 'templates/post.jade', 'templates/partials/*.jade', 'content/**/*'],
            tasks: ['metalsmith']
        }
    });

    grunt.loadNpmTasks('grunt-sitemap');
    grunt.config('sitemap', {
        site: {
            pattern: '<%= dirs.output %>/**/*.html',
            siteRoot: '<%= dirs.output %>'
        }
    });

	grunt.registerTask('build', 'Compiles all of the source files and copies the assets to the build directory.', ['clean', 'copy', 'responsive_images:assets', 'coffee', 'sass', 'jade']);
    grunt.registerTask('build:all', 'Compiles all of the source files (blog included)', ['build', 'metalsmith', 'responsive_images:blog', 'responsive_images:fbshare', 'sitemap']);
	grunt.registerTask('default', 'Compiles everything and copies it to build directory.', ['build']);
};