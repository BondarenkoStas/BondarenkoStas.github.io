$(function() {
	'use strict';
	var $searchFieldMain = $('.search__field--main');
	var $searchFieldResults = $('.search__field--results');

	function ajaxQuery(value){
			$.ajax({
			url: "https://www.googleapis.com/customsearch/v1?q="+encodeURIComponent(value)+"&key=AIzaSyDQq5I1_jJG2eKE78NEUM8GCBRwgXRW0F4&cx=000283222127530457480:fcqttmqm5o0&callback=?",
			dataType: "jsonp",
			success: 
				function(data){
					var template = $('#results__template').html();
					var html = tmpl(template, data);
					$('.results__list').html(html);
				}
		});
	}
//-----------link on main page----------------

	$('.logo--results').on('click', function(){
		$searchFieldMain.val('');
		$('#results').css('display','none');
		$('#main-page').css('display','block');
	});

//-----------search on main page--------------

	$('.search-form--main').on('submit', function(event){
		event.preventDefault();
		ajaxQuery(this.elements[0].value);
		$searchFieldResults.val($searchFieldMain.val());
		$('#main-page').css('display','none');
		$('#results').css('display','block');
	});

//----------search on results page -------------

	$('.search-form--results').on('submit', function(event) {
		event.preventDefault();
		ajaxQuery(this.elements[0].value);
		$searchFieldResults.val(this.elements[0].value);
	});
});