define(function() {

    return Backbone.View.extend({
        tagName: 'section',
        template: Handlebars.compile( $('#tpl-edit').html() ),
        initialize: function () {
            this.collection.bind("sync", this.render, this);
            this.collection.bind("change", this.render, this);
        },
        events: {
          'focus input': 'addAutoComplete',
          'blur input': 'removeAutoComplete',
          'keypress input': 'checkForEnter',
          'dblclick li': 'removeSkiArea'
        },
        addAutoComplete: function (req, res) {
            var self = this;
            $(this.el).find("input").autocomplete({
                source: function (req, res) {
                    $.getJSON('/ski-areas/names/' + req.term, function (suggestions) {
                        res(suggestions);
                    });
                },
                select: function(e, ui) {
                    self.addSkiArea(ui.item.value);
                }
            });
        },
        checkForEnter: function (e) {
            if (e.which === 13) {
                this.addSkiArea();
            }
        },
        removeSkiArea: function (e) {
            var area = this.collection.getById($(e.currentTarget).data('id'));
            area.destroy();
            this.render();
        },
        addSkiArea: function (newResortName) {
            newResortName = newResortName || $(this.el).find("input").val();
            this.collection.create({ name: newResortName });
        },
        render: function() {
            $(this.el).html(this.template({ items: this.collection.toJSON() }));
            return this;
        }
    });

});
