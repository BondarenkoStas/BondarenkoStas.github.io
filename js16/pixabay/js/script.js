$(function(){
	'use strict';
	var $searchFieldMain = $('.search__field--main');
	var $searchFieldResults = $('.search__field--results');

	var API_KEY = '3445177-7fc8f5896edca73fa0a64e585';

	 function fade(element) {
	    var op = 1;  // initial opacity
	    var timer = setInterval(function () {
	        if (op <= 0.1){
	            clearInterval(timer);
	            element.style.display = 'none';
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.1;
	    }, 50);
	}

/*------------------SETTINGS---------------------------*/

	var settings = {properties:
	{
		sort:[]
		,image_type:[]
		,orientation:[]
		,category:[]
	}};

	function formOption(name, text){
		return {name: name,text: text};
	}

	settings.properties.sort.push(
		formOption('popular','Популярные')
		,formOption('latest','Последние загрузки'));
	settings.properties.image_type.push(
		formOption('all','Все изображения')
		,formOption('photo','Фото')
		,formOption('illustration','Векторы')
		,formOption('vector','Иллюстрации'));
	settings.properties.orientation.push(
		formOption('all','Любая ориентация')
		,formOption('horizontal','Горизонтальное фото')
		,formOption('vertical','Вертикальное фото'));
	settings.properties.category.push(
		formOption('all','Все категории')
		,formOption('buildings','Архитектура/Здания')
		,formOption('business','Бизнесс/Финансы')
		,formOption('food','Еда/Напитки')
		,formOption('animals','Животные')
		,formOption('health','Здоровье/Медицина')
		,formOption('computer','Компьютеры/Связь')
		,formOption('fashion','Красота/Мода')
		,formOption('people','Люди')
		,formOption('music','Музыка')
		,formOption('science','Наука/Технологии')
		,formOption('backgrounds','Обои/Рельефы')
		,formOption('education','Образование')
		,formOption('places','Площади/Памятники')
		,formOption('nature','Природа/Пейзажи')
		,formOption('industry','Промышленность/Ремесла')
		,formOption('travel','Путешествия/Отпуск')
		,formOption('religion','Религия')
		,formOption('sports','Спорт')
		,formOption('transportation','Перевозки')
		,formOption('feelings','Эмоции'));
/*----------------- FILLING SETTINGS-----------*/

	var template = $('#set').html();
	var html = tmpl(template,settings);
	$('.search__settings').html(html);

/*-------------------FILLING QUERY--------------*/


	function ajaxQuery(url){
		$.getJSON(url, function(data){
	    if (parseInt(data.totalHits) == 0)
				$('.results__list').html('Простите, мы не смогли найти совпадений');
	  	else {
				var template = $('#results__template').html();
				var html = tmpl(template, data);
				$('.results__list').html(html);

				//-----------------Modal open-----------------------

				$('.result__img').on('click', function(event){
					var href = $(this).parent().data('url');
					$('#overlay').fadeIn(400);
					$('#modal_form')
							.html("<img src='"+href+"'>")
							.css('display', 'block')
							.animate({opacity: 1}, 200);
				});
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
		var url="https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(this.elements[0].value);
		ajaxQuery(url);
		$searchFieldResults.val($searchFieldMain.val());
		$('#main-page').css('display','none');
		$('#results').css('display','block');
	});

//----------search on results page -------------

	$('.search-form--results').on('submit', function(event) {
		event.preventDefault();
		var q = $('.search__field--results').val();
		var sort = $(this).find('#sort').val();
		var image_type = $(this).find('#image_type').val();
		var orientation = $(this).find('#orientation').val();
		var category = $(this).find('#category').val();
		var minWidth = $(this).find('#min-width').val();
		var minHeight = $(this).find('#min-height').val();

		var url = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(q)+"&image_type="+image_type+"&order="+sort+"&orientation="+orientation+"&category="+category+"&min_width="+minWidth+"&min_height="+minHeight;
		ajaxQuery(url);
		$searchFieldResults.val(q);
	});

//-----------modal close------------------------

	$('#overlay').on('click',function(){
		$('#modal_form')
			.animate({opacity: 0}, 200, function(){
					$(this).css('display', 'none');
			});
		$('#overlay').fadeOut(400);
	});

});