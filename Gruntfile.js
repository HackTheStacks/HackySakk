module.exports = function(grunt) {

  // Project configuration.
   // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      server: {
        options:{
          port: 9000,
          base: 'app',
          keepalive: true,
          open:{
            target: 'http://localhost:9000'
          }
        }
      }
    }

  });

};
