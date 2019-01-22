module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      }
    },
    uglify: {
      project: {
        files: {
          'project/project.min.js': ['project/project.js']
        }
      },
      bubblePop: {
        files: {
          'bubblePop/bubblePop.min.js': ['bubblePop/bubblePop.js']
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      project: {
        src: [
          //'project/lib/*.js',
          'project/js/*.js'
        ],
        dest: 'project/project.js'
      },
      bubblePop: {
        src: [
          'bubblePop/lib/liquidfun.js',
          'bubblePop/lib/three.js',
          'bubblePop/lib/renderer.js',
          'bubblePop/lib/demo.js',
          'bubblePop/js/*.js'
        ],
        dest: 'bubblePop/bubblePop.js'
      }
    },
    copy: {
      project: {
        files: [{
          expand: true,
          src: [
            'project.min.js', 'style.css', 'index.html'
          ],
          dest: '../build/projects/project'
        }]
      },
      bubblePop: {
        files: [{
          expand: true,
          src: [
            'bubblePop/bubblePop.min.js', 'bubblePop/style.css', 'bubblePop/index.html'
          ],
          dest: '../build/projects/'
        }]
      }
    },
    clean: {
      options: {
        force: true
      },
      project: ['../build/projects/project/*'],
      bubblePop: ['../build/projects/bubblePop/*']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build:bubblePop', ['concat:bubblePop', 'uglify:bubblePop', 'clean:bubblePop', 'copy:bubblePop']);
  grunt.registerTask('build:project', ['concat:project', 'uglify:project', 'clean:project', 'copy:project']);
};
