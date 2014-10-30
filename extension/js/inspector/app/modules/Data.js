define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'client',
  'app/modules/Data/views/Layout'
], function(Marionette, Radio, logger, Module, client, Layout) {


  return Module.extend({

    channelName: 'data',

    clientEvents: {
      'agent:Model:new': 'onNewModel'
    },

    initialize: function() {
      this.client = client;
    },

    setupData: function() {
    },

    setupEvents: function() {
      logger.log('data', 'setup events');
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onNewModel: function(event) {
      logger.log('data', 'new model', event);
      var data = event.data;
    },

    startModule: function() {
      logger.log('data', 'started');
    },

    buildLayout: function() {
      return new Layout({
      });
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
