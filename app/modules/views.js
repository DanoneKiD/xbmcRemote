define(
        [ "use!backbone", "xbmcRemote", "use!handlebars", "modules/models" ],
        function(Backbone, xbmcRemote, Handlebars, models) {

            xbmcRemote.views.xbmcView = Backbone.View.extend({
                template : "app/templates/xbmcUI.html",

                render : function(done) {
                    var self = this;

                    xbmcRemote.fetchTemplate(this.template, function(data) {
                        var template = Handlebars.compile(data);
                        var context = {
                            title : "My New Post",
                            body : "This is my first post!"
                        }
                        var html = template(context);
                        self.$el.html(html);
                        self.$el.prepend(template).trigger("create");
                    });

                }
            });

            xbmcRemote.views.movieList = Backbone.View.extend({
                viewData : {},
                template : "/app/templates/movieList.html",
                initialize : function(args) {
                    viewData = args.data;
                },

                events : {
                    "click #movieList a" :  function(evt){
                        
                        evt.preventDefault();
                        var source = $(evt.target).parents("a:first"),
                        command = source.attr('data-command'),
                        movieId = source.attr('data-movieId');
                        
                        switch(command){
                        case "play" :
                            console.log('play pressed movieId:' + movieId);
                            break;
                        case "add" :
                            console.log('add pressed movieId:' + movieId);
                            break;
                        case "info" :
                            console.log('info pressed movieId:' + movieId);
                            break;
                        default:
                            alert('unrecognized command');
                        }
                    }
                },

                render : function(done) {
                    var self = this;

                    xbmcRemote.fetchTemplate(this.template, function(content) {
                        var template = Handlebars.compile(content);
                        var json = {
                            movies : viewData.toJSON()
                        };
                        var html = template(json);
                        self.$el.html(html);
                        self.$el.prepend(template);
                        self.$el.trigger("create");
                    });

                }
            });

            xbmcRemote.helpers.listHelper = Handlebars
                    .registerHelper(
                            'list',
                            function(context, block) {

                                if (!context) {
                                    return "";
                                }

                                var data = "<ul data-role='listview' data-filter='true' data-split-theme='a' data-split-icon='home'>"
                                        + context
                                                .map(
                                                        function(item) {
                                                            if (item) {

                                                                return "<li class='videoItem'>"
                                                                        + block(item)
                                                                        + "</li>";
                                                            }
                                                        }).join("\n") + "</ul>";

                                return data;
                            });

            return xbmcRemote;
        });
