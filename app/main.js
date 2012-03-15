require([ "require", "use!backbone", "xbmcRemote", "crossroads", "jquery",
        "modules/views", "hasher", "modules/models" ], function(require,
        Backbone, xbmcRemote, crossroads, $, views, hasher, models) {

    $.mobile = $.mobile || {};
    _.extend($.mobile, {
        hashListeningEnabled : false,
        ajaxEnabled : false,
        linkBindingEnabled : false
    });

    $(document).bind("mobileinit", function(evt) {
        hasher.changed.add(handleChanges); // add hash change listener
        hasher.initialized.add(handleChanges); // add initialized listener (to
        // grab initial value in case it
        // is already set)
        hasher.init(); // initialize hasher (start listening for history
        // changes)
    });

    require([ "jquerymobile" ], function(jqm) {

    });

    require([ "jqmpatches" ], function(jqm) {

    });

    // Put application wide code here

    // routing logic
    crossroads.addRoute('/music/', function(id) {

        var movies = new xbmcRemote.models.movieCollection();
        var view = new xbmcRemote.views.movieList({
            el : $("#mainWindow"),
            data : movies
        });
        view.render();
    });
    
    // routing logic
    crossroads.addRoute('/movies/:id:', function(id) {

        var movies = new xbmcRemote.models.movieCollection();

        movies.fetch({
            allmovies : true,
            success : function(models, options) {
                var view = new xbmcRemote.views.movieList({
                    el : $("#mainWindow"),
                    data : movies
                });
                view.render();


            },
            error : function(models, options) {
                alert('error');
            }
        });
    });

    // routing logic
    crossroads.addRoute('', function(id) {
        var view = new xbmcRemote.views.xbmcView({
            el : $("#mainWindow")
        });
        view.render();

    });
    crossroads.routed.add(console.log, console);

    // handle hash changes
    function handleChanges(newHash, oldHash) {
        var url = $.mobile.path.parseUrl(window.location.href);
        crossroads.parse(url.pathname);
    }

    return xbmcRemote;
});