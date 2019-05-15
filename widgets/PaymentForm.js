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
            $(label).addClass("fieldInput");

            var fieldContainer = document.createElement("div");
            $(fieldContainer).append(label);
            $(fieldContainer).append(field);
            $(fieldContainer).addClass("fieldContainer");

            $(wrapper).append(fieldContainer);

        }

        return wrapper;
    }

    function generateFields() {

        var transactionTypeLabel = document.createElement("label");
        $(transactionTypeLabel).text("Transaction Type: ");
        $(transactionTypeLabel).addClass("transactionTypeLabel");

        var transactionType = global.transaction_type = document.createElement("select");
        generateOptions(transactionType, "Transaction type");
        $(transactionType).addClass("transactionType");

        var transactionTypeContainer = document.createElement("div");
        $(transactionTypeContainer).append(transactionTypeLabel);
        $(transactionTypeContainer).append(transactionType);
        $(transactionTypeContainer).addClass("fieldContainer");

        var referenceNumberLabel = document.createElement("label");
        $(referenceNumberLabel).text("Reference Number: ");
        $(referenceNumberLabel).addClass("referenceNumberLabel");

        var referenceNumber = global.reference_number = document.createElement("label");
        $(referenceNumber).addClass("transactionType");

        var referenceNumberContainer = document.createElement("div");
        $(referenceNumberContainer).append(referenceNumberLabel);
        $(referenceNumberContainer).append(referenceNumber);
        $(referenceNumberContainer).addClass("fieldContainer");

        var amountLabel = document.createElement("label");
        $(amountLabel).text("Amount: ");
        $(amountLabel).addClass("amountLabel");

        var amount = global.amount = document.createElement("label");
        $(amount).addClass("transactionType");

        var amountContainer = document.createElement("div");
        $(amountContainer).append(amountLabel);
        $(amountContainer).append(amount);
        $(amountContainer).addClass("fieldContainer");

        var currencyLabel = document.createElement("label");
        $(currencyLabel).text("Currency: ");
        $(currencyLabel).addClass("currencyLabel");

        var currency = global.currency = document.createElement("label");
        $(currency).addClass("transactionType");

        var currencyContainer = document.createElement("div");
        $(currencyContainer).append(currencyLabel);
        $(currencyContainer).append(currency);
        $(currencyContainer).addClass("fieldContainer");

        var radioCC = generateRadio("Credit Card");
        var radioInvoice = generateRadio("Invoice");

        var wrapper = document.createElement("div");
        $(wrapper).append(transactionTypeContainer);
        $(wrapper).append(referenceNumberContainer);
        $(wrapper).append(amountContainer);
        $(wrapper).append(currencyContainer);
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

    function generateOptions(select, placeholderText) {
        var placeholder = document.createElement("option");
        $(placeholder).attr({
            disabled:'disabled',
            selected:'selected',
            hidden:'hidden'
        });
        $(placeholder).text(placeholderText);
        $(placeholder).val("");

        var authorizationOptn = document.createElement("option");
        $(authorizationOptn).text("Authorization");
        $(authorizationOptn).val("authorization");

        var saleOptn = document.createElement("option");
        $(saleOptn).text("Sale");
        $(saleOptn).val("sale");

        $(select).append(placeholder);
        $(select).append(authorizationOptn);
        $(select).append(saleOptn);
    }

    function constructor() {
        data.access_key = "77246056409d34449977303b767c984c";
        data.profile_id = "60DC420E-7BF0-4BAE-8C43-4F30C5F153C5";
        data.transaction_uuid = generateUniqid();
        data.signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency";
        data.unsigned_field_names = "";
        data.signed_date_time = new Date().toISOString().split(".").shift() + "Z";
        data.locale = "en";
    }

    function generateUniqid() {
        var a = "";
        var b = false;
        var c = Date.now()/1000;
        var d = c.toString(16).split(".").join("");
        while(d.length < 14){
            d += "0";
        }
        var e = "";
        if(b){
            e = ".";
            var f = Math.round(Math.random()*100000000);
            e += f;
        }
        return a + d + e;
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