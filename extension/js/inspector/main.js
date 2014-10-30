// Script loaded every time the devtools are started, the first time the panel is opened.

require.config({
    // paths configuration
    paths: {
        templates: '../../templates',

        jquery: '../lib/jquery',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        radio: '../lib/backbone.radio',
        marionette: '../lib/marionette',
        text: '../lib/text',
        bootstrap: '../lib/bootstrap.min',
        handlebars_original: '../lib/handlebars',
        handlebars: '../lib/handlebars-blocks',
        setImmediate: '../lib/setImmediate',
        bluebird: '../lib/bluebird',
        'jquery.treegrid': '../lib/jquery.treegrid',
        logger: '../common/util/logger'
    },
    // non-amd library loaders
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            init: function () {
                // exports
                return this.Backbone.noConflict();
            }
        },
        "jquery.treegrid": {
            deps: ["jquery"],
            exports: "jQuery.fn.treegrid",
        },
        // 'marionette': {
        //     deps: ['underscore', 'jquery'],
        //     init: function () {
        //         // exports
        //         console.log('require', this);
        //
        //         return this.Backbone.noConflict();
        //     }
        // },
        'bootstrap': {
            deps: ['jquery']
        },
        'handlebars_original': {
            deps: ['bootstrap'], // automatically require bootstrap when requiring an handlebars template
            exports: 'Handlebars'
        },
        'handlebars': { // handlebars with custom block helpers
            deps: ['handlebars_original'],
            exports: 'Handlebars'
        },
        'setImmediate': {
            exports: 'setImmediate'
        }
    }
});

require([
  "jquery",
  "jquery.treegrid",
  "handlebars",
  "marionette",
  "logger",
  "app",
  "app/modules/Radio",
  "app/modules/UI",
  "app/modules/Data",
  "app/modules/Activity",
], function($, treeGrid, Handlebars, Marionette, logger, App, RadioApp, UIApp, DataApp, ActivityApp) {

    Marionette.Renderer.render = function(template, data, view) {
      return Handlebars.compile(template)(data);
    };

    $(document).ready(function() {
        // var router = new Router();
        // Backbone.history.start();

        window.app = new App();
        app.start();
        app.module('Data', DataApp);
        app.module('Radio', RadioApp);
        app.module('UI', UIApp);
        app.module('Activity', ActivityApp)
        app.once('client:page:ready', function () {
          app.navigate('ui');
        });
    });

    logger.log('devtools', 'started!')
});
