$(document).ready(function() {
	$('.tabs__item:first').addClass('tabs__item--active');
	$
	$('.tabsH__item').click(function(){
		if (!$(this).hasClass('tabsH__item--active')) {
			$('.tabsH__item').removeClass('tabsH__item--active');
			$(this).addClass('tabsH__item--active');
			var $selector = '#content_' + $(this).attr('id');
			$('.tabs__item').animate({opacity:0},200).slideUp(300);
			$($selector).slideDown(300).animate({opacity:1},200);
		}
	});
});