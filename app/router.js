require([ "crossroads", "use!historyqueryAdapter", "xbmcRemote",
        "modules/views/movieListView", "modules/views/defaultview" ], function(crossroads, History,
        xbmcRemote) {

    var currentView;
    var contentWindow = $("#contentWindow");
    // Put application wide code here
    // routing logic
    crossroads.addRoute('/{view}/:{id}:', function(viewName, id) {


        switch (viewName) {
        case "home":
            currentView = new xbmcRemote.views.defaultView({el:contentWindow});
            currentView.render();
            break;
        case "movies":
            var viewData = new xbmcRemote.models.movieCollection();
            viewData.fetch({
                allmovies : true,
                success : function(models, options) {
                    currentView = new xbmcRemote.views.movieListView({
                        data : viewData,
                        el : contentWindow
                    });
                    currentView.render();
                },
                error : function(models, options) {
                    alert('error');
                }
            });
            return;

        default:
            view = new xbmcRemote.views.defaultView();
            view.render();
        }

    });

    crossroads.bypassed.add(function(request) {
        crossroads.parse('/home')
    });
    var History = window.History; // Note: We are using a capital H instead of
                                    // a lower h

    // Bind to StateChange Event
    History.Adapter.bind(window, 'statechange', function() { // Note: We are
                                                                // using
                                                                // statechange
                                                                // instead of
                                                                // popstate
        var State = History.getState(); // Note: We are using History.getState()
                                        // instead of event.state
        History.log(State.data, State.title, State.url);
    });
    crossroads.routed.add(function(request, data) {
        console.log(request);
        console.log(data.route + ' - ' + data.params + ' - ' + data.isFirst);
        History.pushState({
            state : 1
        }, "State 1", request);
    });
    return crossroads;
});
