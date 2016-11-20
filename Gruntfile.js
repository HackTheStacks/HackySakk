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
        devtool: "sourcemap",
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
          port: 9000,
          base: 'src/',
          keepalive: true,
          open:{
            target: 'http://localhost:9000/app/'
          }
        }
      }
    }

  });

grunt.registerTask('serve', ['webpack:build-dev','connect','watch']);
};

