Fireform = function (selector, fireBaseRepo, options){
            that=this;
            //here is where we define our various options that we wull use 
            this.error=function(text){console.error(text)};
            var formDOMObject,
                inputs, 
                submitElement,
                successClass = options && options.successClass? options.successClass:"submit-success",
                failedClass = options && options.failedClass? options.failedClass:"submit-failed",
                formValidationClass = options && options.formValidationClass? options.formValidationClass:"form-validation-failed",
                inputValidationClass = options && options.inputValidationClass? options.inputValidationClass:"input-validation-failed",
                simpleValidation = options && options.simpleValidation? options.simpleValidation:false;
                that.emailNotification = options && options.emailNotification? options.emailNotification:undefined;
                that.emailConfirmationName = options.emailConfirmationName? options.emailConfirmationName:undefined;
                that.emailConfirmationSubject = options.emailConfirmationSubject? options.emailConfirmationSubject:undefined;
                that.emailConfirmationBodyHTML = options.emailConfirmationBodyHTML? options.emailConfirmationBodyHTML:undefined;
                that.emailConfirmationBodyText = options.emailConfirmationBodyText? options.emailConfirmationBodyText:undefined;
                that.user=undefined;


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

            if (!fireBaseRepo || fireBaseRepo.length==-0){
                this.error('No Fireform URL entered')
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
                    value=inputs[i].value;

                    
                    if (inputs[i].getAttribute("email-confirmation")==='true' || that.emailConfirmationName===name)
                        that.emailConfirmation = value;

                    if (inputs[i].getAttribute("email-confirmation-from")==='true')
                        that.emailConfirmationFrom = value;


                    if (inputs[i].getAttribute("email-confirmation-from")==='true')
                        that.emailConfirmationFrom = value;


                    if (inputs[i].getAttribute("email-confirmation-subject")==='true')
                        that.emailConfirmationSubject = value;

                    if (inputs[i].getAttribute("email-confirmation-body-html")==='true')
                        that.emailConfirmationBodyHTML = value;


                    if (inputs[i].getAttribute("email-confirmation-body-text")==='true')
                        that.emailConfirmationBodyText = value;

                    if (inputs[i].getAttribute("email-notification")==='true' && !that.emailNotification)
                        that.emailNotification = value;


                    if (type==="radio" && inputs[i].checked===true){
                        payLoad[name]={};
                        payLoad[name].value = inputs[i].checked? value:"";
                        payLoad[name].type=inputs[i].type;
                        payLoad[name].name=inputs[i].name;
                        validationRadio= (inputs[i].checked || validationRadio)? true:false;//flip it to true if checked or keep it true
                    } else if (type!=="submit" && type!=="radio"){
                        payLoad[name]={};
                        payLoad[name].value=value
                        payLoad[name].type=inputs[i].type
                        payLoad[name].name=inputs[i].name
                        payLoad[name].checked=inputs[i].checked
                    }
                    
                    if (type==="radio" && !validationRadio && simpleValidation)
                        inputs[i].className += " "+inputValidationClass;
                    else if (type!=="submit" && value==="" && simpleValidation) 
                        inputs[i].className += " "+inputValidationClass, validation=false;
                    else if(simpleValidation)
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
                var user_repo_tuple, source_tuple, source, user_repo_tuple, user, repo
                if ( url.match("fireform.org/publicexample") || url.match("fireform/publicexample") ) {return "https://fireform.firebaseio.com/example/formPosts.json" }//check for example url
                source_tuple=url.split("://")[1].split('/list/')
                source=source_tuple[0].split('.org')[0]//split the .com
                user_repo_tuple=source_tuple[1].split('/')
                user= that.user = user_repo_tuple[0]
                repo=that.repo=user_repo_tuple[1]
                return "https://"+source+".firebaseio.com/users/simplelogin:"+user+"/lists/"+repo+"/formPosts.json"
            }

            this.getEmailRepo=function(url){
                var user_repo_tuple, source_tuple, source, user_repo_tuple, user, repo
                if ( url.match("fireform.org/publicexample") ) {return null }//check for example url
                source_tuple=url.split("://")[1].split('/list/')
                source=source_tuple[0].split('.org')[0]//split the .com
                user_repo_tuple=source_tuple[1].split('/')
                user=that.user=user_repo_tuple[0]
                repo=user_repo_tuple[1]
                return "https://"+source+".firebaseio.com/users/simplelogin:"+user+"/"
            }


            this.submitForm=function(fireBaseRepo, payLoad){
                var xmlhttp = new XMLHttpRequest, url=this.getRepo(fireBaseRepo);
                xmlhttp.open("POST",url,true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send( JSON.stringify(payLoad) );
                
                var emailPayload={};
                emailPayload.form=payLoad;
                payloadText='';
                payloadHTML="<table>"
                for (var key in emailPayload.form) {
                    payloadText+=' \r\n '+key+" : "+emailPayload.form[key].value
                    payloadHTML+=' <tr><td> '+key+" </td> <td>"+emailPayload.form[key].value+'</td> </tr>'
                };
                payloadText+='</table>'

                emailPayload.fireBaseRepo=fireBaseRepo;
                emailPayload.payloadText=payloadText;
                emailPayload.payloadHTML=payloadHTML;
                emailPayload.uid = that.user?"simplelogin:"+that.user:undefined;
                emailPayload.fireFormRepo=that.repo;


                if (that.emailConfirmation){
                    emailPayload.emailConfirmation= that.emailConfirmation? that.emailConfirmation:undefined;
                    emailPayload.emailConfirmationFrom=that.emailConfirmationFrom? that.emailConfirmationFrom:'no-reply@'+window.location.host;
                    emailPayload.emailConfirmationSubject=that.emailConfirmationSubject? that.emailConfirmationSubject:'Confirming your submition to'+window.location.host;
                    emailPayload.emailConfirmationBodyText=that.emailConfirmationBodyText? that.emailConfirmationBodyText:'Thanks for you submition!';
                    emailPayload.emailConfirmationBodyHTML=that.emailConfirmationBodyHTML? '<div></div>'+that.emailConfirmationBodyHTML:'<div></div><p>Thanks for your submition!<p>'; //front div is a hack for zapier
                    var urlEmailC = 'https://fireform.firebaseio.com/emailQConfirmation.json'//this.getEmailRepo(fireBaseRepo)
                    var xmlhttpEmailC = new XMLHttpRequest;  //this.getRepo(fireBaseRepo);
                    xmlhttpEmailC.open("POST",urlEmailC,true);
                    xmlhttpEmailC.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlhttpEmailC.send( JSON.stringify(emailPayload) );
                }


                if (that.emailNotification){
                    emailPayload.emailNotification= that.emailNotification? that.emailNotification:undefined;
                    var urlEmailN = 'https://fireform.firebaseio.com/emailQNotification.json'//this.getEmailRepo(fireBaseRepo)
                    var xmlhttpEmailN = new XMLHttpRequest;  //this.getRepo(fireBaseRepo);
                    xmlhttpEmailN.open("POST",urlEmailN,true);
                    xmlhttpEmailN.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlhttpEmailN.send( JSON.stringify(emailPayload) );
                };

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