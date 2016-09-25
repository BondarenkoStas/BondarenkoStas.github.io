$(function() {
    //--------------------------------------CAROUSEL
    
    $('.jcarousel').jcarousel({animation:{duration:200}});
    $('.jcarousel-pagination').jcarouselPagination({
        item: function(page) {
          	return '<a href="#' + page + '">' + page + '</a>';
        }
    });
    $('.jcarousel-prev').click(function() {
		$('.jcarousel').jcarousel('scroll', '-=1');
        if($('.jcarousel-pagination .active').prev().is('a'))
            $('.jcarousel-pagination .active').removeClass('active').prev().addClass('active');
	});
	$('.jcarousel-next').click(function() {
		$('.jcarousel').jcarousel('scroll', '+=1');
        if($('.jcarousel-pagination .active').next().is('a'))
            $('.jcarousel-pagination .active').removeClass('active').next().addClass('active');
    });
	$('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });
    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });
    $('.jcarousel-pagination a:first').addClass('active');
    $('.jcarousel-pagination a').click(function(e){
    	$('.jcarousel-pagination a').removeClass('active');
			$(e.target).addClass('active');
    });

    //---------------------------------SELECT

    $( "#speed" ).selectmenu();
    $( "#files" ).selectmenu();
    $( "#number" ).selectmenu()
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );
    $( "#salutation" ).selectmenu();

    //--------------------------------CHECKBOX

    $(".niceCheck").each(function() {
        changeCheckStart($(this));
    });
    $(".niceCheck").mousedown(function() {
        changeCheck($(this));
    });
    function changeCheck(el) {
        var el = el,
            input = el.find("input").eq(0);
         if(!input.attr("checked")) {
            el.css("background-position","0 -17px");    
            input.attr("checked", true)
        } else {
            el.css("background-position","0 0");    
            input.attr("checked", false)
        }
        return true;
    }
    function changeCheckStart(el) {
        var el = el,
        input = el.find("input").eq(0);
        if(input.attr("checked"))
            el.css("background-position","0 -17px");    
        return true;
    }

    /*----------------------MENU JQUERY--------------------*/
    $('.nav>li:has(ul)>a').append('<span class="triangle"></span>');
    $('.nav>li li:has(ul)').append('<span class="triangle triangle--right"></span>');
    $('.nav li').hover(function(){
        $(this)
            .animate({backgroundColor:'#ee4444',},300)
            .find('ul:first')
            .css({visibility: "visible",display: "none"})
            .slideToggle(200);
    },function(){
        $(this)
            .animate({backgroundColor:'#ff6464'},300)
            .find('ul:first')
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