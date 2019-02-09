var mode = 1;
var numBtn = "";
var numOfClick = 0;
var clickTimestamp = 0;
var symbolIndex = 0;
var submitted = 0;
var selection = 0;
var subSelection = 0;
$('.btnC').on('click',function() {
    var str = $('.screenNumber').html();
    $('.screenNumber').html(str.substring(0, str.length - 1));
});

var timeButtonPressed;
var lastPressedDigit;

$('.btnNum').on('mousedown', function() {
    setTimeout(stop,1000);
    if (mode == 1) {
        var num = $(this).data('num');
        $('.screenNumber').html($('.screenNumber').html() + num);
    } else {
        timeButtonPressed = new Date().valueOf();
        lastPressedDigit = $(this).data('num');

        currentNumBtn = $(this).data('num');
        currentClickTimestamp = new Date().valueOf();
        if (currentNumBtn == numBtn && currentClickTimestamp - clickTimestamp < 800 ) {
            numOfClick += 1;
        } else {
            numOfClick = 1;
        }
        symbols = $(this).data('symbols');
        if (currentNumBtn == numBtn && (currentClickTimestamp - clickTimestamp < 800 )) {
            symbolIndex = numOfClick % symbols.length ? numOfClick % symbols.length - 1 : symbols.length - 1;
            var str = $('.screenNumber').html();
            $('.screenNumber').html(str.substring(0, str.length - 1) + symbols[symbolIndex]);
        } else {
            symbolIndex = 0;
            $('.screenNumber').html($('.screenNumber').html() + symbols[symbolIndex]);
        }
        numBtn = currentNumBtn;
        clickTimestamp = currentClickTimestamp;
    }
});
$('.btnNum').on('mouseup', function(){
    if (mode != 1) {
        if (new Date().valueOf() - timeButtonPressed > 200){
            var str = $('.screenNumber').text();
            $('.screenNumber').text(str.substring(0, str.length - 1) + lastPressedDigit); 
        } 
    }
});

var start = 0;
$(".btnNum").mousedown(function(e) {
    if(e.keyCode == 37) {
        start = new Date().getTime();
    } else if(e.keyCode == 39) {
        var elapsed = new Date().getTime() - start;
        alert("elapsed time in milliseconds is: " + elapsed);
        // start again
        start = 0;
    }
});

$('.btnMenu').on('click',function() {
    // var str = $('.screenNumber').html();
    // $('.screenNumber').html(str.substring(0, str.length - 1));
    if(submitted == 1){
        mode = 0;
        str = $('.screenNumber').html();
        selection = str.substring(str.length -1, str.length);
    }
    if(submitted == 4 && selection == 1){
        str = $('.screenNumber').html();
        subSelection = str.substring(str.length -1, str.length);
        if($.isNumeric(subSelection)){
            mode = 0;
        }
    }
    if(submitted == 2 && selection == 2){
        str = $('.screenNumber').html();
        subSelection = str.substring(str.length -1, str.length);
        if($.isNumeric(subSelection)){
            mode = 0;
        }
    }
    if(submitted == 0 && $('.screenNumber').html() == "*123#"){
        mode = 1;
        $('.screenNumber').html("1 - Book a ride <br> 2 - Inquiry/complaint <br> 3 - Add payment method <br>").css( "text-align", "left" );
        submitted++;
    }
    else if(submitted == 1 && selection == 1){
        $('.screenNumber').html("Pick up: <br>");
        submitted++;
    }
    else if(submitted == 2 && selection == 1){
        $('.screenNumber').html("To: <br>");
        submitted++;
    }
    else if(submitted == 3 && selection == 1){
        $('.screenNumber').html(" cost price 3.6€ and estimated distance 2.6km and arrive time 6 minute. <br> Press 1 for accept <br> 2 for cancel <br>");
        submitted++;
        mode = 1;
    }
    else if(submitted == 4 && selection == 1 && subSelection == 1){
        $('.screenNumber').html("Your ride will arrive soon. You will be informed through the sms.");
        submitted++;
    }
    else if(submitted == 4 && selection == 1 && subSelection == 2){
        $('.screenNumber').html("Your ride cancelled. Thanks for using our service!");
        submitted++;
    }
    else if(submitted == 5 && selection == 1){
        mode = 1;
        $('.screenNumber').html("");
        submitted = 0;
    }
    else if(submitted == 1 && selection == 2){
        $('.screenNumber').html("1- Feedback <br> 2- Lost item <br> 3- Return to the menu<br>");
        submitted++;
        mode = 1;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 1){
        $('.screenNumber').html("Type your feedback <br>");
        submitted++;
    }
    else if(submitted == 3 && selection == 2 && subSelection == 1){
        $('.screenNumber').html("Thank you your feedback. Details of your feedback, will be send via SMS.<br>");
        submitted++;
    }
    else if(submitted == 4 && selection == 2 && subSelection == 1){
        mode = 1;
        $('.screenNumber').html("");
        submitted = 0;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 2){
        $('.screenNumber').html("Name of Item? <br>");
        submitted++;
    }
    else if(submitted == 3 && selection == 2 && subSelection == 2){
        $('.screenNumber').html("Ride reference Number? <br>");
        submitted++;
    }
    else if(submitted == 4 && selection == 2 && subSelection == 2){
        $('.screenNumber').html("We are starting to look for your lost item. We will inform you in 24 hour <br>");
        submitted++;
    }
    else if(submitted == 5 && selection == 2 && subSelection == 2){
        mode = 1;
        $('.screenNumber').html("");
        submitted = 0;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 3){
        $('.screenNumber').html("1- Book a ride <br> 2- Inquiry / complaint <br> 3- Add payment method <br><br>");
        submitted = 1;
        mode = 1;
    }
});
$('.btnNext').on('click',function(){
    document.getElementById('screen').scrollTop -=10;
});
$('.btnPrev').on('click',function(){
    document.getElementById('screen').scrollTop +=10;
});
$('.btn').on('click',function() {
    if($('.screenNumber').html().length < 30){
        console.log("heree")
        $(".screenNumber").css({'font-size':24});
    }
    else{
        console.log("heree 2")
        $(".screenNumber").css({'font-size':12});
    }
    if ($('.screenNumber').html()) {
        $('.screenNumber').removeClass('hidden');
    } else {
        $('.screenNumber').addClass('hidden');
    }
});
