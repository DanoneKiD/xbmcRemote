define(
        [ "use!backbone", "xbmcRemote" ],
        function(Backbone, xbmcRemote) {

            xbmcRemote.models.player = Backbone.Model.extend({
                initialize : function() {

                }
            

            
            });

            xbmcRemote.models.movie = Backbone.Model.extend({
                defaults : {
                    "fanart" : "",
                    "file" : "",
                    "label" : "",
                    "movieid" : "",
                    "thumbnail" : ""
                }
            });

            xbmcRemote.models.movieCollection = Backbone.Collection
                    .extend({
                        model : xbmcRemote.models.movie,
                        sync : function(method, model, options) {

                            return $
                                    .ajax({
                                        type : 'POST',
                                        crossDomain : true,
                                        url : 'http://XBMC:1060/jsonrpc',
                                        data : '{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "id": 1}',
                                        success : options.success,
                                        error : options.error,
                                        dataType : "json"
                                    });

                        },
                        parse : function(resp, xhr) {
                            return resp.result.movies;
                        }
                    });
        });
