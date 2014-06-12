define(["backbone", "marionette"], function(Backbone, Marionette, msgBus) {
  var App;
  console.log('Whaat?');
  App = new Marionette.Application();
  App.addRegions({
    header: "#header",
    main: "#main",
    sidebar: "#sidebar"
  });
  App.navigate = function(route, options) {
    options || (options = {});
    return Backbone.history.navigate(route, options);
  };
  App.getCurrentRoute = function() {
    return Backbone.history.fragment;
  };
  return App.on('initialize:after', function() {
    if (Backbone.history) {
      Backbone.history.start();
    }
    if (this.getCurrentRoute() === '') {
      console.log('App initialized');
      console.log('git test');
      return console.log('last test');
    }
  });
});
