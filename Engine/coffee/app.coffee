App = new Marionette.Application()
App.addRegions
	header: "#header"
	main: "#main"
	sidebar: "#sidebar"

App.navigate = (route, options) ->
	options || (options = {})
	Backbone.history.navigate(route,options)

App.getCurrentRoute = ->
	return Backbone.history.fragment

App.on 'initialize:after', ->
	if Backbone.history
		Backbone.history.start()
	if this.getCurrentRoute() == ''
		console.log('App initialized')
		console.log('git test')
		console.log('last test')
