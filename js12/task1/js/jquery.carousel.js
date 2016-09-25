(function($){
	var defaults = {
		animationSpeed:500,
		arrowSize:30,
		arrowColor:'red',
		arrowBg:'white',
		imageNumber:4,
		imageWidthDivHeight:1366/768,
		imageWidth:200,
		imageMargin:50,
		imageScale:'cover'
	}
	var methods = {
		init:function(params){
			var options = $.extend({},defaults,params);
			if(options.arrowSize<16)
				options.arrowSize = 16;
			var pixelsOffset = options.imageMargin + options.imageWidth;
			var carouselWidth = options.imageNumber*pixelsOffset - options.imageMargin;
			if(!options.imageHeight)
				options.imageHeight = options.imageWidth / options.imageWidthDivHeight;
			return $(this).each(function(){
				var leftUIEL = $('.carousel__arrow--left');
				var rightUIEL = $('.carousel__arrow--right');
				var elementsList = $('.carousel__list');

				//-------------ARROWS-------------------------
				$('.carousel__arrow')
					.css({'border': options.arrowSize+'px solid transparent',
					  'border-top-color': options.arrowColor})
					.append('<span></span>')
					.find('span').css({'border': 0.6*options.arrowSize+'px solid transparent',
					  'border-top-color': options.arrowBg,
					  'transform': 'translate(-'+0.6*options.arrowSize+'px, -'+1.01*options.arrowSize+'px)'});
				$('.carousel__arrow--left').css({'transform':'rotate(90deg) translate(0px, '+0.5*options.arrowSize+'px)'});
				$('.carousel__arrow--right').css({'transform':'rotate(270deg) translate(0px, '+0.5*options.arrowSize+'px'});
				//--------------------------------------------
				
				$('.carousel__hider').css('width',carouselWidth+'px');
				elementsList.find('li').css({'margin-right':options.imageMargin+'px'});
				elementsList.find('li img').each(function(){
					var src = $(this).attr('src');
					$(this).wrap('<div class="img__wrap"></div>');
					$(this).parent().css({
						'background':'url("'+src+'") center no-repeat',
						'background-size':options.imageScale,
						'width':options.imageWidth+'px',
						'height':options.imageHeight+'px',});
				});
				elementsList.find('p').css('width',options.imageWidth);

				var currentLeftValue = 0;
				var elementsCount = elementsList.find('li').length;
				var minimumOffset = -((elementsCount-options.imageNumber)*pixelsOffset);
				var maximumOffset = 0;

				leftUIEL.click(function(){
					if(currentLeftValue != maximumOffset){
						currentLeftValue += pixelsOffset;
						elementsList.stop().animate({left:currentLeftValue+'px'},options.animationSpeed);
					}
				});
				rightUIEL.click(function(){
					if(currentLeftValue != minimumOffset){
						currentLeftValue -= pixelsOffset;
						elementsList.stop().animate({left:currentLeftValue+'px'},options.animationSpeed);
					}
				});
			});
		}
	}
	$.fn.carousel = function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof method==='object' || !method){
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод "'+method+'"не найден в плагине jQuery.carousel');
		}
	};
})(jQuery);