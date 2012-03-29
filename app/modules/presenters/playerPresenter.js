define([ "use!backbone", "xbmcRemote", "crossroads", "modules/models/player",
    "modules/models/videoLibrary" ], function(Backbone, xbmcRemote, crossroads,
    player, videoLibrary) {

  var _player = player, _videoLibrary = videoLibrary;

  xbmcRemote.views.playerView = Backbone.View.extend({
    viewData : {},
    player : _player,
    videoLibrary : _videoLibrary,
    videoDetailFields : [
                         "title", 
                         "genre", 
                         "year", 
                         "rating", 
                         "director", 
                         "trailer", 
                         "tagline", 
                         "plot", 
                         "plotoutline", 
                         "originaltitle", 
                         "lastplayed", 
                         "playcount", 
                         "writer", 
                         "studio", 
                         "mpaa", 
                         "cast", 
                         "country", 
                         "imdbnumber", 
                         "premiered", 
                         "productioncode", 
                         "runtime", 
                         "set", 
                         "showlink", 
                         "streamdetails", 
                         "top250", 
                         "votes", 
                         "fanart", 
                         "thumbnail", 
                         "file", 
                         "sorttitle", 
                         "resume", 
                         "setid"
                       ],
    template : "/app/templates/player.html",
    
    fetchModel : function() {
      var self = this;
      var dfd = new jQuery.Deferred();

      player.getActivePlayers(function success(data, status, xhr) {

        if (data.result.length === 0) {
          dfd.resolve();
          return dfd.promise();
        }

        self.viewData.activePlayers = data.result;
        var activePlayer = self.viewData.activePlayers[0];
        $.when(
            player.getProperties(activePlayer.playerid, function(playerData,
                xhrStatus, xhrObject) {
              _.extend(activePlayer, playerData.result);
            }),
            player.getItem(activePlayer.playerid, function(playerData,
                xhrStatus, xhrObject) {
              _.extend(activePlayer, playerData.result);
            })).done(
            function(propertiesData, itemData) {
              videoLibrary.getMovieDetails(activePlayer.item.id, self.videoDetailFields, function(
                  playerData, xhrStatus, xhrObject) {
                _.extend(activePlayer.item, playerData.result);
                dfd.resolve();
              });
            });

      });

      return dfd.promise();
    },
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
        data : '{"jsonrpc": "2.0", "method": "' + command + '", "id": 1}',
        success : function(data, status, xhr) {
          console.log(command + " dispatched status :" + status);
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
      $.when(self.fetchModel()).then(function(status) {
        xbmcRemote.fetchTemplate(self.template, function(templateContent) {
          var template = Handlebars.compile(templateContent);
          var html = template(self.viewData.activePlayers[0]);
          self.el.innerHTML = html;
          self.$el.trigger("create");
        });
      });
    }
  });
  // controller logic
  crossroads.addRoute("/player/", function() {

  });

});
