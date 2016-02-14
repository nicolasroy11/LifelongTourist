
module.exports = function(config) {
  config.set({

    basePath: '',


    frameworks: ['jasmine'],


    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-resource/angular-resource.js',
        'client/controllers/roomem.controller.js',
        'client/controllers/auth.controller.js',
        'test/test.js'
    ],


    exclude: [
    ],


    preprocessors: {
    },


    reporters: ['progress'],


    port: 9876,


    colors: true,


    logLevel: config.LOG_INFO,


    autoWatch: true,


    browsers: ['PhantomJS'],


    singleRun: false,

    concurrency: Infinity
  })
}
