// form.on("value", function(data) {
//   var name = data.val() ? data.val().name : "";
//   console.log("My name is " + name);
// });
(function($) {
    $.fireform = function(element, options) {

        var fb = new Firebase(options),
            target = $(element);

        target.children(':submit').on('click', function() {
            event.preventDefault()
            var obj = {};
            target.find('input').each(function(key, input) {
                var name = $(input).attr('name'),
                    val = $(input).val();
                if (name)
                    obj[name] = val;
                else if ($(input).attr('type') !== 'submit')
                    obj['unnamed' + key] = val;
            });
            var form = fb;
            obj['_time'] = new Date().toString();
            form.push(obj, function(err) {
                if (!err)
                    target.addClass("submited");
                else
                    target.addClass("error");
            });
        });
    }

    // add the plugin to the jQuery.fn object
    $.fn.fireform = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('fireform')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.fireform(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('fireform', plugin);

            }

        });

    }
})($);