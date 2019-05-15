var PaymentForm = function()  {
    var global = {
        form: null,

        submitBtn: null,
        wrapper: null
    }

    initialize();

    function initialize() {
        var hiddenFields = generateHiddenFields();
        var visibleFields = generateVisibleFields();
        var radios = generateRadioButtons();
        
        var submitBtn = global.submitBtn = document.createElement("input");
        $(submitBtn).attr({
            type: "submit",
            id: "submit",
            name: "submit",
            value: "Submit"
        });
        $(submitBtn).addClass("submitBtn");

        var form = global.form = document.createElement("form");
        $(form).attr({
            id: "payment-form",
            class: "payment-form",
            action: "https://testsecureacceptance.cybersource.com/pay",
            method: "post"
        });
        $(form).append(hiddenFields);
        $(form).append(visibleFields);
        $(form).append(radios);
        $(form).append(submitBtn);

        var wrapper = global.wrapper = document.createElement("div");
        $(wrapper).append(form);
        $(wrapper).addClass("wrapper");
    }

    function generateHiddenFields() {
        var wrapper = document.createElement("div");
        $(wrapper).addClass("hiddenFields");

        for(var x = 0; x < HIDDEN_FIELDS.length; x ++) {
            var field = document.createElement("input");
            $(field).attr({
                type: HIDDEN_FIELDS[x].type,
                name: HIDDEN_FIELDS[x].name,
                value: HIDDEN_FIELDS[x].value
            });
            $(wrapper).append(field);
        }

        return wrapper;
    }

    function generateVisibleFields() {
        var wrapper = document.createElement("div");
        $(wrapper).addClass("visibleFields");

        for(var x = 0; x < VISIBLE_FIELDS.length; x++) {
            var label = document.createElement("label");
            $(label).addClass("fieldLabel");
            $(label).text(VISIBLE_FIELDS[x].label);

            var field = document.createElement("input");
            $(field).attr({
                type: "text",
                name: VISIBLE_FIELDS[x].name,
                readonly: VISIBLE_FIELDS[x].readonly,
            });
            $(field).addClass("fieldInput");

            var fieldContainer = document.createElement("div");
            $(fieldContainer).append(label);
            $(fieldContainer).append(field);
            $(fieldContainer).addClass("fieldContainer");

            $(wrapper).append(fieldContainer);
        }

        return wrapper;
    }

    function generateRadioButtons() {
        var radioCC = generateRadio("Credit Card");
        var radioInvoice = generateRadio("Invoice");

        var wrapper = document.createElement("div");
        $(wrapper).append(radioCC);
        $(wrapper).append(radioInvoice);
        $(wrapper).addClass("visibleFields");

        return wrapper;
    }

    function generateRadio(label) {
        var radio = document.createElement("input");
        $(radio).attr({
            type: "radio",
            name: "paymentMode",
            value: label
        });
        $(radio).addClass("radio");
        
        var radioLabel = document.createElement("label");
        $(radioLabel).text(label);
        $(radioLabel).addClass("radioLabel");

        var wrapper = document.createElement("div");
        $(wrapper).append(radio);
        $(wrapper).append(radioLabel);
        $(wrapper).addClass("radioContainer");

        return wrapper;
    }

    PaymentForm.prototype.getSubmitButton = function() { 
        return global.submitBtn;
    }

    PaymentForm.prototype.getForm = function() { 
        return global.form;
    }

    PaymentForm.prototype.getWidget = function() { 
        return global.wrapper;
    }
}