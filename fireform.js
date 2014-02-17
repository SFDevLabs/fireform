// // form.on("value", function(data) {
// //   var name = data.val() ? data.val().name : "";
// //   console.log("My name is " + name);
// // });
// (function($) {
//     $.fireform = function(element, options) {

//         var fb = new Firebase(options),
//             target = $(element);

//         target.children(':submit').on('click', function() {
//             event.preventDefault()
//             var obj = {};
//             target.find('input').each(function(key, input) {
//                 var name = $(input).attr('name'),
//                     val = $(input).val();
//                 if (name)
//                     obj[name] = val;
//                 else if ($(input).attr('type') !== 'submit')
//                     obj['unnamed' + key] = val;
//             });
//             var form = fb;
//             obj['_time'] = new Date().toString();
//             form.push(obj, function(err) {
//                 if (!err)
//                     target.addClass("submited");
//                 else
//                     target.addClass("error");
//             });
//         });
//     }

//     // add the plugin to the jQuery.fn object
//     $.fn.fireform = function(options) {

//         // iterate through the DOM elements we are attaching the plugin to
//         return this.each(function() {

//             // if plugin has not already been attached to the element
//             if (undefined == $(this).data('fireform')) {

//                 // create a new instance of the plugin
//                 // pass the DOM element and the user-provided options as arguments
//                 var plugin = new $.fireform(this, options);

//                 // in the jQuery version of the element
//                 // store a reference to the plugin object
//                 // you can later access the plugin and its methods and properties like
//                 // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
//                 // element.data('pluginName').settings.propertyName
//                 $(this).data('fireform', plugin);

//             }

//         });

//     }
// })($);


// // form.on("value", function(data) {
// //   var name = data.val() ? data.val().name : "";
// //   console.log("My name is " + name);
// // });
// (function($) {
//     $.fireform2 = function(element, selector, options) {

//         if ( !options.fireBaseRepo )
//             console.error("Please pass fireBaseRepo as a option in the 2nd parameter.")

//         Fireform(element, options.fireBaseRepo)
//     };
//     // add the plugin to the jQuery.fn object
//     $.fn.fireform2 = function(options) {

//         // iterate through the DOM elements we are attaching the plugin to
//         return this.each(function() {

//             // if plugin has not already been attached to the element
//             if (undefined == $(this).data('fireform2')) {

//                 // create a new instance of the plugin
//                 // pass the DOM element and the user-provided options as arguments
//                 var plugin = new $.fireform2(this, options);

//                 // in the jQuery version of the element
//                 // store a reference to the plugin object
//                 // you can later access the plugin and its methods and properties like
//                 // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
//                 // element.data('pluginName').settings.propertyName
//                 $(this).data('fireform2', plugin);

//             }

//         });

//     }
// })($);


Fireform = function (selector, fireBaseRepo, options){
            that=this;


            this.error=function(text){console.error(text)};
            var formDOMObject,
                inputs, 
                submitElement,
                successClass= options && options.successClass? options.successClass:"submit-success",
                failedClass=options && options.failedClass? options.failedClass:"submit-failed",
                formValidationClass=options && options.formValidationClass? options.formValidationClass:"form-validation-failed",
                inputValidationClass=options && options.inputValidationClass? options.inputValidationClass:"input-validation-failed",
                simpleValidation=options && options.simpleValidation? options.simpleValidation:false;


            if (typeof selector!=="string"){
                formDOMObject = selector;
            }else if ( selector.search(/^\./)===0 ) {
                formDOMObject = document.getElementsByClassName(selector.slice(1))[0]
                console.warn("We will default to the first form matching this class selector");
            }
            else if ( selector.search(/^\#/)===0 ){
                formDOMObject = document.getElementById(selector.slice(1));
            }else if (!formDOMObject){
                this.error('Please use a Class or Id Selector. This mean your string should begin with a "." or "#".  You man also pass in a Dom elment object')
                return
            }
            if (!formDOMObject.tagName){
                this.error('No DOM object found!')
                return
            }else if(formDOMObject.tagName!=="FORM"){
                this.error('DOM elments is not a <form>')
                return
            }
            this.formDOMObject=formDOMObject

            this.inputs=inputs=formDOMObject.elements

            for (var i = this.inputs.length - 1; i >= 0; i--) {
                var type;
                type = inputs[i].getAttribute('type');
                if (type==="submit"){ submitElement=inputs[i]; break;}
            };
            if (!submitElement){this.error('Please add a submit button with a <input type="submit"> attr"'); return;} 
            
            this.submitElement=submitElement;


            this.submit = function(e){
                var validation=true;
                var validationRadio;
                if (event) event.preventDefault();
                else if (e && e.preventDefault) event.preventDefault();

                var payLoad={};
                payLoad._time={}
                payLoad._time.name = '_time';// add the time
                payLoad._time.type = '_time';// add the time
                payLoad._time.value = new Date().toString();// add the time
                for (var i = that.inputs.length - 1; i >= 0; i--) {
                    var name, type;
                    name = that.inputs[i].name ? inputs[i].name : 'input_'+String(i);
                    type = inputs[i].type

                    
                    if (type==="radio"){
                        payLoad[name]={};
                        payLoad[name].value = inputs[i].checked? inputs[i].value:"";
                        payLoad[name].type=inputs[i].type;
                        payLoad[name].name=inputs[i].name;
                        validationRadio= (inputs[i].checked || validationRadio)? true:false;//flip it to true if checked or keep it true
                    } else if (type!=="submit"){
                        payLoad[name]={};
                        payLoad[name].value=inputs[i].value
                        payLoad[name].type=inputs[i].type
                        payLoad[name].name=inputs[i].name
                        payLoad[name].checked=inputs[i].checked
                    }

                    // if (type==="text" || type==="" ) payLoad[name]= {value:inputs[i].value,type:inputs[i].type};
                    // else if (type==="checkbox") payLoad[name]={value:inputs[i].value,type:inputs[i].type} 
                    // else if (type==="radio") payLoad[name]=inputs[i].value+":"+inputs[i].type;
                    // else if (type==="select-one") payLoad[name]=inputs[i].value+":"+inputs[i].type;
                    if (type==="radio" && !validationRadio)
                        inputs[i].className += " "+inputValidationClass;
                    else if (type!=="submit" && payLoad[name].value==="") 
                        inputs[i].className += " "+inputValidationClass, validation=false;
                    else 
                        inputs[i].className=inputs[i].className.replace(new RegExp(inputValidationClass, 'g'),"");
                }
                if ( (validation && validationRadio)|| !simpleValidation)
                    that.submitForm(fireBaseRepo, payLoad),
                    formDOMObject.className=formDOMObject.className.replace(new RegExp(formValidationClass, 'g'),"");
                else
                    formDOMObject.className += " "+formValidationClass,
                    that.error('Validation Failed. Classname '+formValidationClass+' Added to inputs');
                    


            }

            this.getRepo=function(url){
                if ( url.match("fireform.org/publicexample") || url.match("fireform/publicexample") ) {return "https://fireform.firebaseio.com/example/formPosts.json" }//check for example url
                source_tuple=url.split("://")[1].split('/list/')
                source=source_tuple[0].split('.org')[0]//split the .com
                user_repo_tuple=source_tuple[1].split('/')
                user=user_repo_tuple[0]
                repo=user_repo_tuple[1]
                return "https://"+source+".firebaseio.com/users/simplelogin:"+user+"/lists/"+repo+"/formPosts.json"
            }

            this.submitForm=function(fireBaseRepo, payLoad){
                var xmlhttp = new XMLHttpRequest, url=this.getRepo(fireBaseRepo);
                xmlhttp.open("POST",url,true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send( JSON.stringify(payLoad) );

                xmlhttp.onreadystatechange=function(){
                    if (xmlhttp.readyState == 4) {
                        formDOMObject.className += " "+successClass
                        if (!options || !options.disableInput) that.disableInput(that.submitElement);
                        if (options && options.callback) options.callback(null,{url:url});
                    }
                }                
            }

            this.disableInput=function(submit){
                var att=document.createAttribute("disabled");
                        att.value="true";
                        submit.setAttributeNode(att);
            }

            submitElement.onclick=this.submit;
            return this;


    };
