module.exports = function(grunt) {

  // Project configuration.
   // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    webpack: {
      options: webpackConfig,
      "build-dev": {
        debug: true
      }
    },

    watch:{
      files: 'app/**.*',
      tasks: ['webpack']
    },

    connect: {
      server: {
        options:{
          port: 2016,
          base: 'src/',
          keepalive: true,
          open:{
            target: 'http://localhost:2016/app/'
          }
        }
      }
    }

  });

grunt.registerTask('serve', ['webpack:build-dev','connect','watch']);
};
