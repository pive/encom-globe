module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      tasks: ['browserify'],
      files: [
        'src/*.js',
        'index.html',
        'styles.css',
        'Gruntfile.js',
        'browserify.js',
      ],
    },
    browserify: {
      'build/<%= pkg.name %>.js': ['browserify.js'],
    },
    shell: {
      buildgrid: {
        command:
          'bin/buildgrid -r 500 -o grid.js -m resources/equirectangle_projection.png',
      },
    },
    terser: {
      options: {
        ecma: 2015,
        compress: true,
        mangle: true,
      },
      main: {
        files: {
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js'],
        },
      },
    },
    prettier: {
      options: {
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
      },
      files: {
        src: ['src/**/*.js', 'Gruntfile.js'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-prettier');

  grunt.registerTask('buildgrid', ['shell:buildgrid']);
  grunt.registerTask('build', ['browserify', 'terser']);
  grunt.registerTask('format', ['prettier']);
};
