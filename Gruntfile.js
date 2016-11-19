module.exports = function(grunt) {

  // Project configuration.
   // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      autoprefixer: {
        files: ['<%= app/css/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
      }
    },
    connect: {
      options: {
        port: 8080,
        livereload: 1337,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            'app/*.html'
          ]
        }
      }
    },
    autoprefixer: {
      options: {
          browsers: ['> 5%', 'last 10 versions', 'Firefox ESR', 'Opera 12.1']
      }
    }

  });


  // Default task(s).
  grunt.registerTask('serve', ['connect:livereload','watch']);

};