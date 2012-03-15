// Set the require.js configuration for your application.
require.config({
    // Initialize the application with the main application file
    deps : [ "main", "handlebars" ],

    paths : {
        // JavaScript folders
        libs : "../assets/js/libs",
        plugins : "../assets/js/plugins",

        // Libraries
        handlebars : "../assets/js/libs/handlebars",
        underscore : "../assets/js/libs/underscore",
        backbone : "../assets/js/libs/backbone",
        crossroads : "../assets/js/libs/crossroads",
        signals : "../assets/js/libs/signals",
        hasher : "../assets/js/libs/hasher",
        jquery : "../assets/js/libs/jquery",
        jquerymobile : "../assets/js/libs/jquery.mobile",
        jqmpatches : "../assets/js/libs/jqueryMobile.monkeyPatch",
        
        // Shim Plugin
        use : "../assets/js/plugins/use"
    },

    use : {
        backbone : {
            deps : [ "use!underscore", "jquery" ],
            attach : "Backbone"
        },
        underscore : {
            attach : "_"
        },
        handlebars : {
            attach : "Handlebars"
        }
    }
});


