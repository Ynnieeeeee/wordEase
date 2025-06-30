
function validation (options) {

    var selectorRules = {};

    function validate(inputElement, rule) {
        var erroElement = inputElement.parentElement.querySelector(options.errorSelector)
        var erroMessage;

        var rules = selectorRules[rule.selector];
       
        for(var i = 0; i < rules.length ; i++){
            erroMessage = rules[i](inputElement.value);
            if(erroMessage) {
                break;
            }
        }

        if(erroMessage){
            erroElement.innerText = erroMessage;
        } else {
            erroElement.innerText = '';
        }

        return !erroMessage;
    }

    var formElement = document.querySelector(options.form);
    if(formElement){

        formElement.addEventListener("submit", function(e){
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                }
            })

            if(isFormValid){
                //Submit với js
                if(typeof options.onsubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    options.onsubmit(formValues);
                }
                //Submit vs hành động mặc định của trình duyệt
                else {
                    formElement.submit();
                }
            } 
        })

        //Lấy element của form cần validate
        options.rules.forEach(function(rule){

            if(Array.isArray(selectorRules[rule.selector])){
                (selectorRules[rule.selector]).push(rule.text);
            } else {
                selectorRules[rule.selector] = [rule.text];
            }
            

            var inputElement = formElement.querySelector(rule.selector);
            var erroElement = inputElement.parentElement.querySelector(options.errorSelector);

            if(inputElement){
                //Xử lí trường hợp blur khỏi input
                inputElement.addEventListener("blur", function(){
                   validate(inputElement, rule);
                })

                //Xử lí trường hợp khi user đang nhập vào input
                inputElement.addEventListener("input", function(){
                    erroElement.innerText = '';
                })
            }
        });
    }
}

validation.isRequired = function(selector, message) {
    return {
        selector: selector,
        text: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

validation.isEmail = function(selector) {
    return {
        selector: selector,
        text: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Email không hợp lệ'
        }
    }
}

validation.isPassWord = function(selector, message) {
     return {
        selector: selector,
        text: function(value){
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/;
            return regex.test(value) ? undefined : message || 'Giá trị không hợp lệ'
        }
    }
}