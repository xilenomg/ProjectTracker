module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [ 
					'node_modules/angular/angular.js',
					'node_modules/angular-cookies/angular-cookies.js',
					'node_modules/angular-messages/angular-messages.js',
					'node_modules/angular-modal-service/dst/angular-modal-service.js',
					'node_modules/angular-resource/angular-resource.js',
					'node_modules/angular-route/angular-route.js',
					'public/assets/javascript/app/app.js',
					'public/assets/javascript/app/controllers/*.js',
					'public/assets/javascript/app/filters/*.js',
					'public/assets/javascript/app/models/*.js',
					'public/assets/javascript/app/services/*.js'
				],
				dest: 'public/assets/javascript/project-tracker.js'
			},
			distcss:{
				src: [ 'node_modules/bootstrap/dist/css/bootstrap.css', 'public/assets/stylesheet/compiled/project-tracker.css' ],
				dest: 'public/assets/stylesheet/project-tracker.min.css'
			}
		},
		uglify : {
			js: {
				files: {
					'public/assets/javascript/project-tracker.min.js': ['public/assets/javascript/project-tracker.js']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'public/assets/stylesheet/project-tracker.min.css': ['public/assets/stylesheet/project-tracker.min.css']
				}
			}
		},
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'public/assets/stylesheet/compiled/project-tracker.css': 'public/assets/stylesheet/sass/*.{scss,sass}'
				}
			}
		},
		watch: {
			sass: {
				files: ['public/assets/stylesheet/sass/*.{scss,sass}'],
				tasks: ['sass:dist', 'concat:distcss', 'cssmin']
			},
			concat:{
				files: [
					'public/assets/javascript/app/app.js',
					'public/assets/javascript/app/controllers/**/*.js',
					'public/assets/javascript/app/filters/**/*.js',
					'public/assets/javascript/app/models/**/*.js',
					'public/assets/javascript/app/services/**/*.js'
				],
				tasks: ['concat:dist','uglify']
			},
			uglify:{
				files: ['public/assets/javascript/project-tracker.min.js', 'public/assets/javascript/admin/project-tracker.js'],
				tasks: ['uglify:js']
			}
		},
		copy: {
			files: {
				src: 'node_modules/fonts/**/*',
				dest: 'public/assets/fonts'
			}
		}
	});
grunt.registerTask('default', ['watch', 'sass:dist', 'copy']);
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-copy');
};