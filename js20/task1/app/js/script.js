$(function(){
	$('.jcarousel').jcarousel({});
	//-----------------------SCROLL PREVIOUS-----------
	$('.jcarousel-prev')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
		});
	//-----------------------SCROLL NEXT---------------
	$('.jcarousel-next')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
		});
		//---------------------PAGINATION------------------
	$('.jcarousel__pagination')
	.on('jcarouselpagination:active', 'a', function() {
		$(this).addClass('active');
	})
	.on('jcarouselpagination:inactive', 'a', function() {
		$(this).removeClass('active');
	})
	.jcarouselPagination({
		item: function(page) {
			return '<a href="#' + page + '"><div class="point"></div></a>';
		}
	});

	//-----------------------ACCORDEON----------------------------
	$('.accordeon .header__mark').on('click', function(e) {
		var expandedItem = ($(this).html() === '+');
		$('.accordeon__item--expanded')
			.toggleClass('accordeon__item--expanded', false)
			.find('.header__mark')
			.html('+');
		if (expandedItem) {
			$(this)
				.html('-')
				.closest('.accordeon__item')
				.toggleClass('accordeon__item--expanded', true);
		};
		return false;
	});

});    