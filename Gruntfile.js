module.exports = function(grunt) {

  // Project configuration.
   // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    webpack: {
      options: {
        entry: './src/app.js',
        output: {
          filename: 'src/bundle.js'
        },
        module: {
          loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
          }],
        },
        watch: true 
      }
    },

    watch:{
      files: 'app/**.*',
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

grunt.registerTask('serve', ['connect','watch']);
};

