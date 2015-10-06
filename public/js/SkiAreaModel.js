define(["backbone"], function(Backbone) {
	return Backbone.Model.extend({
	    defaults: {
	        "id": undefined,
	        "web": undefined,
	        "name": undefined
	    }
	});
});
