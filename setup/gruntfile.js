module.exports = function(grunt) {
  require('load-grunt-config')(grunt); // Reduce duplicated grunt.loadNpmTasks()

	// Collect file lists for SASS/HTML/JS/Karma
	var sass_json = grunt.file.readJSON('json/sass_files.json');
	var html_json = grunt.file.readJSON('json/html_files.json');
	var js_json = grunt.file.readJSON('json/js_files.json');
	var img_json = grunt.file.readJSON('json/img_files.json');
  var json_files_json = grunt.file.readJSON('json/json_files.json');
console.log(sass_json);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			main: {
			    options: {
			    	style: 'compressed',
		        	sourcemap: 'none',
		        	noCache: true
		        },
		        files: sass_json.files
		    }
		},

		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: html_json.files
			}
		},

		uglify: {
			main: {
				files: js_json.files
			}
		},

		copy: {
			images: {
				files: img_json.files
			},
			json: {
				files: json_files_json.files
			}
		},

		connect: {
			options: {
				port: 8000,
				base: '../release/',
				hostname: '*',
				livereload: true
			},
			livereload: {
				options: {
					open: {
						target: 'http://localhost:' + 8000
					}
				}
			}
		},

		watch: {
			css: {
				files: sass_json.watch,
				tasks: 'sass:main',
				options: {
					livereload: true,
					spawn: false,
				}
			},
			html: {
				files: html_json.watch,
				tasks: 'htmlmin:main',
				options: {
					livereload: true,
					spawn: false,
				}
			},
			js: {
				files: js_json.watch,
				tasks: 'uglify:main',
				options: {
					livereload: true,
					spawn: false,
				}
			},
			img: {
				files: img_json.watch,
				tasks: 'copy:images',
				options: {
					livereload: true,
					spawn: false,
				}
			},
			json: {
				files: json_files_json.watch,
				tasks: 'copy:json',
				options: {
					livereload: true,
					spawn: false,
				}
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln('\n\n>> UPDATE >> RUNNING: '.yellow + target.green + '\n\n');
	});

  grunt.registerTask('run', ['connect', 'watch']);
	grunt.registerTask('setup', ['sass', 'htmlmin', 'uglify', 'connect']);

};
