require([ "use!backbone", "xbmcRemote" ],
        function(Backbone, xbmcRemote) {
            xbmcRemote.views.defaultView = Backbone.View
                    .extend({
                        template : "app/templates/defaultView.html",
                        events : {
                            "click [data-command]" : "executeCommand"
                        },
                        executeCommand : function(evt) {
                            var source = $(evt.target).parents("a:first")
                            var command = source.attr("data-command");

                            $.ajax({
                                type : 'POST',
                                crossDomain : true,
                                url : 'http://XBMC:1060/jsonrpc',
                                data : '{"jsonrpc": "2.0", "method": "'
                                        + command + '", "id": 1}',
                                success : function(data, status, xhr) {
                                    console.log(command
                                            + " dispatched status :" + status);
                                },
                                error : function(data, status, xhr) {

                                },
                                dataType : "json"
                            });

                            evt.preventDefault();
                            return false;

                        },
                        render : function(done) {
                            var self = this;

                            xbmcRemote.fetchTemplate(this.template, function(templateContent) {
                                    var template = Handlebars
                                            .compile(templateContent);
                                    var context = {};
                                    var html = template(context);
                                    self.el.innerHTML = html;
                                    self.$el.trigger("create");
                                });

                        }
                    });

        });
