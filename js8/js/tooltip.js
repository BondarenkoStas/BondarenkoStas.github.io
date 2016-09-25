$(document).ready(function() {
	$('[title]').each(function(i){
		$(this).parent()
			.append("<div class='tooltip' id='tooltip"+i+"'><p>"+$(this).attr('title')+"</p></div>");
		var my_tooltip = $("#tooltip"+i);
		var timer;

		function tooltipOn(){
			timer = setTimeout(function(){
				my_tooltip
					.animate({opacity:0.9},400)
					.css({display:'inline-block'});
			},200);
		};
		function tooltipOff(){
			if (!$(this).is(':hover') && !$(this).is(':focus')) {
				clearTimeout(timer);
				my_tooltip
					.animate({opacity:0},400);
			}
		}
		
		$(this)
			.removeAttr("title")
			.bind('mouseover focus', tooltipOn)
			.bind('mouseout blur', tooltipOff);
	});
});