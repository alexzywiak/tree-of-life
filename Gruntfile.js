module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'server/**/*.js'],
      options: {
        multistr: true,
        ignores: ['app/lib/**/*', 'app/scripts/services/d3.js'],
        globals: {
          "angular": true
        }
      }
    },

    // Injects all bower dependencies into index.html
    // Injects between <!-- bower:css / js --><!-- endbower -->
    wiredep: {
      task: {
        src: ['app/index.html']
      }
    },

    // Remove all files from the dist folder
    clean: ['app/dist/**/*'],

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          // Concat all js files in app
          'app/dist/scripts/app.js': ['app/scripts/**/*.js'],
        }
      }
    },

    uglify: {
      options:{
        mangle: false
      },
      dist: {
        files: {
          // Minify concatenated files
          'app/dist/scripts/app.min.js': ['app/dist/scripts/app.js'],
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'app/dist/styles/style.min.css': ['app/styles/**/*.css']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'app/**/*.css', '!app/dist/**'],
      tasks: ['build']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-wiredep');
  // Register Grunt Tasks

  // Runs jshint, concats and minifies js and css to dist folder. 
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'wiredep',
    'concat',
    'uglify',
    'cssmin',
  ]);

  // Grunt Task
  grunt.registerTask('default', ['build', 'watch']);

  // Register tasks for buildpack on heroku deploy
  // https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt
  // Change ENV vars: heroku config:set NODE_ENV=production

  // Development Tasks
  grunt.registerTask('heroku', ['build']);

};
