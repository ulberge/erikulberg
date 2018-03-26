module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['build/sketch/*.html', 'build/sketch/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};