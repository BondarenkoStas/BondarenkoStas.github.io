$(function() {
    //--------------------------------------CAROUSEL

    $('.jcarousel').jcarousel({
        animation: {
            duration: 200
        }
    });
    $('.jcarousel-pagination').jcarouselPagination({
        item: function(page) {
            return '<a href="#' + page + '">' + page + '</a>';
        }
    });
    $('.jcarousel-prev').click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
        if ($('.jcarousel-pagination .active').prev().is('a'))
            $('.jcarousel-pagination .active').removeClass('active').prev().addClass('active');
    });
    $('.jcarousel-next').click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
        if ($('.jcarousel-pagination .active').next().is('a'))
            $('.jcarousel-pagination .active').removeClass('active').next().addClass('active');
    });
    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });
    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });
    $('.jcarousel-pagination a:first').addClass('active');
    $('.jcarousel-pagination a').click(function(e) {
        $('.jcarousel-pagination a').removeClass('active');
        $(e.target).addClass('active');
    });

    //---------------------------------SELECT

    $("#speed").selectmenu();
    $("#files").selectmenu();
    $("#number").selectmenu()
        .selectmenu("menuWidget")
        .addClass("overflow");
    $("#salutation").selectmenu();

    //--------------------------------CHECKBOX

    $(".newCheck").each(function() {
        changeCheckStart($(this).find('input[type="checkbox"]').eq(0));
    });
    $(".newCheck label").mousedown(function() {
        changeCheck($(this).find('input[type="checkbox"]').eq(0));
    });

    function changeCheck(el) {
        var el = el;
        if (!el.attr("checked"))
            el.attr("checked", true).parent().css("background-position", "0 -17px");
        else
            el.attr("checked", false).parent().css("background-position", "0 0");
        return true;
    }

    function changeCheckStart(el) {
        el.wrap('<span class="niceCheck"></span>');
        var el = el;
        if (el.attr("checked"))
            el.parent().css("background-position", "0 -17px");
        return true;
    } /*----------------------MENU JQUERY--------------------*/
    $('.nav>li:has(ul)>a').append('<span class="triangle"></span>');
    $('.nav>li li:has(ul)').append('<span class="triangle triangle--right"></span>');
    $('.nav li').hover(function() {
        $(this)
            .stop()
            .animate({
                backgroundColor: '#ee4444',
            }, 200)
            .find('ul:first')
            .stop()
            .css({
                visibility: "visible",
                display: "none"
            })
            .slideToggle(200);
    }, function() {
        $(this)
            .stop()
            .animate({
                backgroundColor: '#ff6464'
            }, 200)
            .find('ul:first')
            .stop()
            .slideToggle(200);
    });

    /*--------------------MENU JS-------------------------*/
    /*


        document.querySelectorAll('.nav>li').forEach(function(e){
            var triangleDown = document.createElement('span');
            triangleDown.className = 'triangle';
            if(e.getElementsByTagName('ul').length)
                e.querySelector('a').appendChild(triangleDown);
        });
        document.querySelectorAll('.nav>li li').forEach(function(e){
            var triangleRight = document.createElement('span');
            triangleRight.className = 'triangle triangle--right';
            if(e.getElementsByTagName('ul').length)
                e.querySelector('a').appendChild(triangleRight);
        });
        document.querySelectorAll('.nav li').forEach(function(event){
            if(event.querySelector('ul')){
                var timerin = null;
                var timerout = null;
                var ul = event.querySelector('ul'); 
                var initHeight = ul.offsetHeight; 
                function mouseOver(){                
                    var h = 0;       
                    ul.style.visibility = 'visible';
                    ul.style.display = 'block';
                    timerin = setInterval(function(){
                        if(h >= initHeight){
                            clearInterval(timerin);
                            return;
                        }
                        else {
                            h+=5;
                            ul.style.height = h + 'px';                     
                        }
                    }, 1);
                }  
                function mouseLeave(){
                    var h = initHeight;
                    timerout = setInterval(function(){
                        if(h <= 0){
                            clearInterval(timerout);
                            ul.style.visibility = 'hidden';
                            ul.style.display = 'none';
                            return;
                        }
                        else {
                            h-=5;
                            ul.style.height = h + 'px';                        
                        }
                    }, 1);
                }      
                event.onmouseenter = mouseOver;
                event.onmouseleave = mouseLeave;
            }
        });

        */

});
