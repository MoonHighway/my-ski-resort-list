define(['./SkiAreaModel.js'], function(SkiArea) {

	return Backbone.Collection.extend({
	    model: SkiArea,
	    url: '/ski-areas/myList',
	    getById: function (id) {
	        return this.filter(function (area) {
	            return area.get("id") == id;
	        })[0];
	    }
	});

});