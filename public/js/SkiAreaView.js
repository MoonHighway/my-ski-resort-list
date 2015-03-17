window.SkiAreaView = Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile( $('#tpl-ski-area').html() ),
    events: {
        'click h1': 'details'
    },
    details: function (e) {
        window.location = "/#/skiarea/" + this.model.get('id');
    },
    render: function (e) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});