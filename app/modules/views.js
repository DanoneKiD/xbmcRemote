define([ "use!backbone", "xbmcRemote", "use!handlebars", "modules/models"], function(Backbone,
        xbmcRemote, Handlebars, models) {

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

        render : function(done) {
            var self = this;

            xbmcRemote.fetchTemplate(this.template, function(content) {
                var template = Handlebars.compile(content);
                var json = {movies : viewData.toJSON()};
                var html = template(json);
                self.$el.html(html);
                self.$el.prepend(template);
                self.$el.trigger("create");
            });

        }
    });
    
    xbmcRemote.helpers.listHelper = Handlebars.registerHelper('list', function (context, block) {

        if(!context){
            return "";
        }
            
        var data = "<ul data-role='listview' data-filter='true' data-split-theme='a' data-split-icon='home'>"
            + context.map(function (item) {
              if(item){

                  return "<li class='videoItem'>" + block(item) + "</li>";
              }
            }).join("\n") + "</ul>";
        
        return data;
      });
    
    return xbmcRemote;
});
