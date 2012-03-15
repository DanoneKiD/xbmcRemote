require(
        [ "jquerymobile","crossroads" ],
        function(jqm, crossroads) {

            // click routing - direct to HTTP or Ajax, accordingly
            $(document)
                    .bind(
                            "click",
                            function(event) {

                                var link = findClosestLink(event.target), $link = $(link), httpCleanup;

                                // If there is no link associated with the click
                                // or its not
                                // a left
                                // click we want to ignore the click
                                // TODO teach $.mobile.hijackable to operate on
                                // raw dom
                                // elements so the link wrapping
                                // can be avoided
                                if (!link || event.which > 1
                                        || !$link.jqmHijackable().length) {
                                    return;
                                }

                                // remove active link class if external (then it
                                // won't be
                                // there if you come back)
                                httpCleanup = function() {
                                    window.setTimeout(function() {
                                        removeActiveLinkClass(true);
                                    }, 200);
                                };

                                // If there's data cached for the real href
                                // value, set the
                                // link's href back to it again. This pairs with
                                // an address
                                // bar workaround from the vclick handler
                                if ($link.jqmData("href")) {
                                    $link.attr("href", $link.jqmData("href"));
                                }

                                // if there's a data-rel=back attr, go back in
                                // history
                                if ($link.is(":jqmData(rel='back')")) {
                                    window.history.back();
                                    return false;
                                }

                                crossroads.parse($link.attr("href"));
                                
                                event.preventDefault();
                            });

            /* Event Bindings - hashchange, submit, and click */
            function findClosestLink(ele) {
                while (ele) {
                    // Look for the closest element with a nodeName of "a".
                    // Note that we are checking if we have a valid nodeName
                    // before attempting to access it. This is because the
                    // node we get called with could have originated from within
                    // an embedded SVG document where some symbol instance
                    // elements
                    // don't have nodeName defined on them, or strings are of
                    // type
                    // SVGAnimatedString.
                    if ((typeof ele.nodeName === "string")
                            && ele.nodeName.toLowerCase() == "a") {
                        break;
                    }
                    ele = ele.parentNode;
                }
                return ele;
            }

        });