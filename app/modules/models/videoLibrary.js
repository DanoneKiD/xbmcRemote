/*5.9 VideoLibrary

    5.9.1 VideoLibrary.Clean
    5.9.2 VideoLibrary.Export
    5.9.3 VideoLibrary.GetEpisodeDetails
    5.9.4 VideoLibrary.GetEpisodes
    5.9.5 VideoLibrary.GetGenres
    5.9.6 VideoLibrary.GetMovieDetails
    5.9.7 VideoLibrary.GetMovieSetDetails
    5.9.8 VideoLibrary.GetMovieSets
    5.9.9 VideoLibrary.GetMovies
    5.9.10 VideoLibrary.GetMusicVideoDetails
    5.9.11 VideoLibrary.GetMusicVideos
    5.9.12 VideoLibrary.GetRecentlyAddedEpisodes
    5.9.13 VideoLibrary.GetRecentlyAddedMovies
    5.9.14 VideoLibrary.GetRecentlyAddedMusicVideos
    5.9.15 VideoLibrary.GetSeasons
    5.9.16 VideoLibrary.GetTVShowDetails
    5.9.17 VideoLibrary.GetTVShows
    5.9.18 VideoLibrary.Scan

*/

define(["jquery"], function($){
    var videoLibrary = {
        getMovieDetails : function(movieid, properties, successCallback, errorCallback){
            return $.ajax({
                type : 'POST',
                crossDomain : true,
                url : 'http://XBMC:1060/jsonrpc',
                data : '{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovieDetails","params": {"movieid":'
                    + movieid + ', "properties": ' + JSON.stringify(properties) + ' }, "id": 1}',
                success : successCallback,
                error : errorCallback,
                dataType : "json"});
        }

    };
    
    return videoLibrary;
});