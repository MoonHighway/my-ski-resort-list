define(["./SkiAreaCollection.js",
        "./ManageMyAreasView.js",
        "./SkiAreaModel.js",
        "./SkiAreaView.js",
        "./SkiAreasView.js"], function(SkiAreaCollection, ManageMyAreasView, SkiAreaModel, SkiAreaView, SkiAreasView) {

    return Backbone.Router.extend({
        routes: {
            "manage": "manage",
            "skiarea/:id": "areaDetails",
            "*actions": "defaultRoute"
        },
        initialize: function () {
            this.mySkiAreaCollection = new SkiAreaCollection();
            this.mySkiAreaCollection.fetch();
            Backbone.history.start();
        },
        manage: function () {
            this.manageMyAreasView = new ManageMyAreasView({collection: this.mySkiAreaCollection});
            $('#content').html(this.manageMyAreasView.render().el);
        },
        areaDetails: function (id) {
            this.skiAreaModel = this.mySkiAreaCollection.get(id);
            this.skiAreaView = new SkiAreaView({ model: this.skiAreaModel });
            $('#content').html(this.skiAreaView.render().el);
        },
        defaultRoute: function (actions) {
            this.mySkiAreasView = new SkiAreasView({collection: this.mySkiAreaCollection});
            $('#content').html(this.mySkiAreasView.render().el);
        }

    });

});