var mode = 1;
var numBtn = "";
var numOfClick = 0;
var clickTimestamp = 0;
var symbolIndex = 0;
var submitted = 0;
var selection = 0;
var subSelection = 0;
$('.btnC').on('click',function() {
    var str = $('.screenNumber').text();
    $('.screenNumber').text(str.substring(0, str.length - 1));
});

$('.btnNum').on('click',function() {
    if (mode == 1) {
        var num = $(this).data('num');
        $('.screenNumber').text($('.screenNumber').text() + num);
    } else {
        currentNumBtn = $(this).data('num');
        currentClickTimestamp = new Date().valueOf();
        if (currentNumBtn == numBtn && currentClickTimestamp - clickTimestamp < 500 ) {
            numOfClick += 1;
        } else {
            numOfClick = 1;
        }
        var symbols = $(this).data('symbols');
        if (currentNumBtn == numBtn && (currentClickTimestamp - clickTimestamp < 500 )) {
            symbolIndex = numOfClick % symbols.length ? numOfClick % symbols.length - 1 : symbols.length - 1;
            var str = $('.screenNumber').text();
            $('.screenNumber').text(str.substring(0, str.length - 1) + symbols[symbolIndex]);
        } else {
            symbolIndex = 0;
            $('.screenNumber').text($('.screenNumber').text() + symbols[symbolIndex]);
        }
        numBtn = currentNumBtn;
        clickTimestamp = currentClickTimestamp;
    }
});
$('.btnMenu').on('click',function() {
    // var str = $('.screenNumber').text();
    // $('.screenNumber').text(str.substring(0, str.length - 1));
    if(submitted == 1){
        mode = 0;
        str = $('.screenNumber').text();
        selection = str.substring(str.length -1, str.length);
    }
    if(submitted == 4 && selection == 1){
        str = $('.screenNumber').text();
        subSelection = str.substring(str.length -1, str.length);
        if($.isNumeric(subSelection)){
            mode = 0;
        }
    }
    if(submitted == 2 && selection == 2){
        str = $('.screenNumber').text();
        subSelection = str.substring(str.length -1, str.length);
        if($.isNumeric(subSelection)){
            mode = 0;
        }
    }
    if(submitted == 0 && $('.screenNumber').text() == "*123#"){
        mode = 1;
        $('.screenNumber').text("1- Book a ride \n 2- Inquiry / complaint \n 3- Add payment method \n\n");
        submitted++;
    }
    else if(submitted == 1 && selection == 1){
        $('.screenNumber').text("From ? \n");
        submitted++;
    }
    else if(submitted == 2 && selection == 1){
        $('.screenNumber').text("To ? \n");
        submitted++;
    }
    else if(submitted == 3 && selection == 1){
        $('.screenNumber').text(" Estimated cost price XX and distance XX and arrive time XX \n Press 1 for accept, 2 for cancel");
        submitted++;
        mode = 1;
    }
    else if(submitted == 4 && selection == 1 && subSelection == 1){
        $('.screenNumber').text("Your ride will arrive soon. You will be informed through the sms.");
        submitted++;
    }
    else if(submitted == 4 && selection == 1 && subSelection == 2){
        $('.screenNumber').text("Your ride cancelled. Thanks for using our service!");
        submitted++;
    }
    else if(submitted == 5 && selection == 1){
        mode = 1;
        $('.screenNumber').text("");
        submitted = 0;
    }
    else if(submitted == 1 && selection == 2){
        $('.screenNumber').text("1- Feedback \n 2- Lost item \n 3- Return to the menu \n\n");
        submitted++;
        mode = 1;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 1){
        $('.screenNumber').text("Type your feedback \n");
        submitted++;
    }
    else if(submitted == 3 && selection == 2 && subSelection == 1){
        $('.screenNumber').text("Thank you your feedback. Details of your feedback, will be send via SMS.\n");
        submitted++;
    }
    else if(submitted == 4 && selection == 2 && subSelection == 1){
        mode = 1;
        $('.screenNumber').text("");
        submitted = 0;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 2){
        $('.screenNumber').text("Name of Item? \n");
        submitted++;
    }
    else if(submitted == 3 && selection == 2 && subSelection == 2){
        $('.screenNumber').text("Ride reference Number? \n");
        submitted++;
    }
    else if(submitted == 4 && selection == 2 && subSelection == 2){
        $('.screenNumber').text("We are starting to look for your lost item. We will inform you in 24 hour \n");
        submitted++;
    }
    else if(submitted == 5 && selection == 2 && subSelection == 2){
        mode = 1;
        $('.screenNumber').text("");
        submitted = 0;
    }
    else if(submitted == 2 && selection == 2 && subSelection == 3){
        $('.screenNumber').text("1- Book a ride \n 2- Inquiry / complaint \n 3- Add payment method \n\n");
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
    if($('.screenNumber').text().length < 30){
        console.log("heree")
        $(".screenNumber").css({'font-size':24});
    }
    else{
        console.log("heree 2")
        $(".screenNumber").css({'font-size':15});
    }
    if ($('.screenNumber').text()) {
        $('.screenNumber').removeClass('hidden');
    } else {
        $('.screenNumber').addClass('hidden');
    }
});
