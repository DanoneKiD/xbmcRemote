
require([ "use!backbone", "xbmcRemote" ], function(Backbone, xbmcRemote) {

    xbmcRemote.views.settingsView = Backbone.View.extend({
        template : "app/templates/xbmcUI.html",

        render : function(done) {
            var self = this;

            xbmcRemote.fetchTemplate(this.template, function(data) {
                var template = Handlebars.compile(data);
                var context = {
                    title : "My New Post",
                    body : "This is my first post!"
                };
                var html = template(context);
                self.$el.html(html);
                self.$el.prepend(template).trigger("create");
            });

        }
    });

});