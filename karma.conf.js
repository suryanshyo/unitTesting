// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/unit-testing-demo'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    color: true,
    check: {
      global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
          excludes: [
              'foo/bar/**/*.js'
          ]
      },
      each: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
          excludes: [
              'other/directory/**/*.js'
          ],

      }
      ,
    },
    watermarks: {
        statements: [ 70, 90 ],
        functions: [ 70, 90 ],
        branches: [ 70, 90 ],
        lines: [ 70, 90 ]
    },
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
