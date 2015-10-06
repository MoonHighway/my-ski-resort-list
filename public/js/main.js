require.config({
    paths: {
        "jquery": ["bower_components/jquery/dist/jquery.min"],
        "jquery-ui": ["bower_components/jquery-ui/jquery-ui.min"],
        "underscore": ["bower_components/underscore/underscore-min"],
        "handlebars": ["bower_components/handlebars/handlebars.min"],
        "backbone": ["bower_components/backbone/backbone-min"]
    }
});

require(["jquery", "/js/AppRouter.js"], function ($, AppRouter) {
    window.app = new AppRouter();
});