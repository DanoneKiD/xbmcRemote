define([
// Libs
"use!backbone" ],

function(Backbone) {

    var exportValue = {
        // This is useful when developing if you don't want to use a
        // build process every time you change a template.
        //
        // Delete if you are using a different template loading method.
        fetchTemplate : function fetchTemplate(path, success, fail) {
            var JST = window.JST = window.JST || {};

            // Should be an instant synchronous way of getting the template, if
            // it
            // exists in the JST object.
            if (JST[path]) {
                success(JST[path]);
                return;
            }

            $.ajax({
                url : path.toString(),
                success : function(data, textStatus, jqXHR) {
                    JST[path] = data;
                    success(data);
                },
                cache : false
            });

        },
        views : {},
        models : {},
        helpers : {},
        // Keep active application instances namespaced under an app object.
        app : _.extend({}, Backbone.Events)
    };

    return exportValue;
});
