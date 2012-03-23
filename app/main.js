require([ "require", 
          "use!backbone", 
          "xbmcRemote", 
          "crossroads", 
          "jquery",
          "use!historyqueryAdapter",
          "modules/presenters/homePresenter" ],
        function(require, Backbone, xbmcRemote, crossroads, $, homePresenter, History) {

            $.mobile = $.mobile || {};
            _.extend($.mobile, {
                hashListeningEnabled : false,
                ajaxEnabled : false,
                linkBindingEnabled : false,
                pushStateEnabled : false
            });

            $(document).bind("mobileinit", function(evt) {

                crossroads.parse($.mobile.path.parseUrl(window.location.href).pathName);
            });

            require([ "jquerymobile" ], function(jqm) {

            });

            // Treat the jQuery ready function as the entry point to the
            // application.
            // Inside this function, kick-off all initialization, everything up
            // to this
            // point should be definitions.
            $(function() {
                // Define your master router on the application namespace and
                // trigger
                // all
                // navigation from this instance.
                // xbmcRemote.router = new Router();

                // Trigger the initial route and enable HTML5 History API
                // support
            });

            // All navigation that is relative should be passed through the
            // navigate
            // method, to be processed by the router. If the link has a
            // data-bypass
            // attribute, bypass the delegation completely.
            $(document).on(
                    "click",
                    "a:not([data-bypass] or [data-command])",
                    function(evt) {
                        // Get the anchor href and protcol
                        var href = $(this).attr("href");
                        var protocol = this.protocol + "//";

                        // Ensure the protocol is not part of URL, meaning its
                        // relative.
                        if (href && href.slice(0, protocol.length) !== protocol
                                && href.indexOf("javascript:") !== 0) {
                            // Stop the default event to ensure the link will
                            // not cause
                            // a page
                            // refresh.
                            evt.preventDefault();

                            // This uses the default router defined above, and
                            // not any
                            // routers
                            // that may be placed in modules. To have this work
                            // globally
                            // (at the
                            // cost of losing all route events) you can change
                            // the
                            // following line
                            // to: Backbone.history.navigate(href, true);
                            // Backbone.history.navigate(href, true);
                            crossroads.parse(href);
                            // xbmcRemote.router.navigate(href, true);
                        }
                    });
            
            //pushstate/history logic
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
            
//            //load first presenter
//            crossroads.bypassed.add(function(request) {
//                if(request !== ''){
//                    require(['modules/presenters/' + request], function(presenter){
//                       crossroads.parse(request); 
//                    });
//                }
//                
//            });

            $(document).ready(function(evt){
                crossroads.parse('/Home');
            });
        });