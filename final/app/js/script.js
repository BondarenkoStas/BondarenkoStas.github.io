$(function(){ 
	//---------------------sliders-------------------------------
	var slider = [];
	for(var i = 0; i < 3; i++){
		var owl = $('#slider'+(i+1));
		owl.owlCarousel({
			pagination:false,
			slideSpeed:700,
     			singleItem:true
		});
		slider.push(owl);
		slider[i].find('.icon-arrow--left').click(function(){
			$(this).closest('.slider').trigger('owl.prev');
		})
		slider[i].find('.icon-arrow--right').click(function(){
			$(this).closest('.slider').trigger('owl.next');
		})
	}
//		mounting massonry
		
//		i use setInterval - bacause images on request 
//		do not have time to load 
//		and the plugin is not activated
	var mas = setInterval(function() {
		$('.grid').masonry({
			itemSelector: '.grid-item', 
			columnWidth: '.grid-sizer',
			gutter: 10
		});
	}, 100);
		
	function getPictures (request) {
		var q = request ? '&q='+encodeURIComponent(request) : '';
		$.ajax({
			url: "https://pixabay.com/api/?key=2654122-2e7cfe65e4216a71a55f9c97a&image_type=photo"+q+"&callback=?",
			dataType: "jsonp",
			success: function (data) {
				if (data) {
					var data = {'data': data};
					var template = $('#search_template').html();
					$('.search__results').html(tmpl(template, data));			
				} else {
					$('.search__results').html("Error");
				}					
			}				
		});			
	}
	var someQuery = ['travelling','autumn','green','honey','money','car','mountain','time','summer','spring'];
	getPictures(someQuery[Math.floor(Math.random()*10)]);

	$('.search__button').on('click', function (e) {
		var request = $('.search__input').val();
		getPictures(request);
		
	});
			
});