define(
        [ "use!backbone", "xbmcRemote", "use!handlebars", "modules/models" ],
        function(Backbone, xbmcRemote, Handlebars, models) {

            xbmcRemote.views.remoteView = Backbone.View
                    .extend({
                        template : "app/templates/remoteUI.html",

                        render : function(done) {
                            var self = this;
                            xbmcRemote.fetchTemplate(
                                            this.template,
                                            function(data) {
                                                var template = Handlebars
                                                        .compile(data), context = {}, html = template(context);
                                                self.el.innerHTML = html;
                                            });

                        }
                    });


        });
