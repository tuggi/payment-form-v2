var root = "#root";

var widgets = {
    PaymentFormWidget: null,
};

function initializeWidget() {
    widgets.PaymentFormWidget = $.extend(true, {}, new PaymentForm());
    $(root).append(widgets.PaymentFormWidget.getWidget());

    setValues();
    setHandlers();
}

function setValues() {
    var urlParams = new URLSearchParams(window.location.search);
    // widgets.PaymentFormWidget.getData().reference_number = urlParams.get('reference_number');
    // $(widgets.PaymentFormWidget.getReferenceNumber()).text(widgets.PaymentFormWidget.getData().reference_number);
    // widgets.PaymentFormWidget.getData().amount = urlParams.get('amount');
    // $(widgets.PaymentFormWidget.getAmount()).text(widgets.PaymentFormWidget.getData().amount);
    // widgets.PaymentFormWidget.getData().currency = urlParams.get('currency');
    // $(widgets.PaymentFormWidget.getCurrency()).text(widgets.PaymentFormWidget.getData().currency);
}

function setHandlers() {
    //?reference_number=123&amount=123&currency=php
    $(widgets.PaymentFormWidget.getTransactionType()).on("change", function() { 
        widgets.PaymentFormWidget.getData().transaction_type = $(this).children("option:selected").val();
    });

    $(widgets.PaymentFormWidget.getSubmitButton()).on("click tap", function() { 
        var data = "";
        var dataObject = widgets.PaymentFormWidget.getData();
        for (var [key, value] of Object.entries(dataObject)) {
            if(value) {
                data += key + "=" + value + ",";
            } else {
                data += key + "=,";
            }
        }
       
        data = data.slice(0, -1).split(",signature").shift(); 
        // data = data.slice(0, -1).split(",submit").shift(); 
        if($('input[name=paymentMode]:checked').val() == "Credit Card") {
            encrypt(data);
            sendRequest(dataObject)
        } else if ($('input[name=paymentMode]:checked').val() == "Invoice"){
            alert("Invoice picked");
        } else {
            // alert("None picked");
        }
        console.log(data);
    });
}

function encrypt(data) {
    var secretKey = '8c4b9d0291964771b5f28fd40ace5674cde8e6f2c15e48efb07dd716d4fba60cc90157f1af4149458d028ae906a79d0ef8fbda4c258e4f3f80bc78f0b7f00d294732c48a7aee4603826e66112e25c65ac3670b6955c14bf59f7e459d3b9e7a94d05a4ffb2d1448e5b79d0ff53a149d878db590f508ff46e3815aa6b172534e80';
    var hash = CryptoJS.HmacSHA256(data, secretKey);
    var base64 = CryptoJS.enc.Base64.stringify(hash);
    widgets.PaymentFormWidget.getData().signature = base64;
    console.log(base64);
}

function sendRequest(data) {
    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }

    $.ajax({
        url: 'https://testsecureacceptance.cybersource.com/pay',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            console.log(data);
            window.open("https://testsecureacceptance.cybersource.com/checkout");
            // $("body").html(data);
        },
        error: function(error) {
            console.log("error", error);
            
        }
    });
}

$(document).ready(function() {
    initializeWidget();
});