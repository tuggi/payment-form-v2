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
    //?reference_number=123&amount=123&currency=php
    var urlParams = new URLSearchParams(window.location.search);
    $('[name=reference_number]').val(urlParams.get('reference_number'));
    $('[name=amount]').val(urlParams.get('amount'));
    $('[name=currency]').val(urlParams.get('currency'));
    $('[name=signed_date_time]').val(new Date().toISOString().substring(0, 19) + 'Z');
    $('[name=transaction_uuid]').val(generateUniqid());
}

function setHandlers() {
    $(widgets.PaymentFormWidget.getForm()).submit(function() {
        var data = decodeURIComponent($(widgets.PaymentFormWidget.getForm()).serialize()).replace(/&/g, ',');
        var secretKey = '8c4b9d0291964771b5f28fd40ace5674cde8e6f2c15e48efb07dd716d4fba60cc90157f1af4149458d028ae906a79d0ef8fbda4c258e4f3f80bc78f0b7f00d294732c48a7aee4603826e66112e25c65ac3670b6955c14bf59f7e459d3b9e7a94d05a4ffb2d1448e5b79d0ff53a149d878db590f508ff46e3815aa6b172534e80';
        var hash = CryptoJS.HmacSHA256(data, secretKey);
        var base64 = CryptoJS.enc.Base64.stringify(hash);
        $('<input>').attr({
            type: 'hidden',
            id: 'signature',
            name: 'signature',
            value: base64
        }).appendTo(widgets.PaymentFormWidget.getForm());

        return true;
    });
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

$(document).ready(function() {
    initializeWidget();
});