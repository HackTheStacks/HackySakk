module.exports = function(grunt) {

  // Project configuration.
   // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch:{
      files: 'app/**.*'
    },

    connect: {
      server: {
        options:{
          port: 9000,
          base: 'src/app/',
          keepalive: true,
          open:{
            target: 'http://localhost:9000'
          }
        }
      }
    }

  });

grunt.registerTask('serve', ['connect','watch']);
};

