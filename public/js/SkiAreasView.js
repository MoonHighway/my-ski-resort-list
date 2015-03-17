window.SkiAreasView = Backbone.View.extend({
    tagName: 'section',
    initialize: function () {
        this.collection.bind("sync", this.render, this);
    },
    render: function (e) {
        $(this.el).empty();
        if (this.collection.length) {
            _.each(this.collection.models, function (skiArea) {
                $(this.el).append(new SkiAreaView({model: skiArea}).render().el);
            }, this);
        } else {
            $(this.el).html("No Current Ski Areas Listed");
        }
        return this;
    }
});