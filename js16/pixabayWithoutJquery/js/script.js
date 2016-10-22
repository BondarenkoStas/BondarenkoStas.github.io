'use strict';
window.onload = function(){
	var searchFieldMain = document.getElementsByClassName('search__field--main')[0];
	var searchFieldResults = document.getElementsByClassName('search__field--results')[0];
	var overlay = document.getElementById('overlay');
	var modalForm = document.getElementById('modal_form');

	var API_KEY = '3445177-7fc8f5896edca73fa0a64e585';

//---------------------FOR MODAL----------------------

	function fadeOut(element,time) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= 0.1;
    }, time/10);
	}
	function fadeIn(element,time) {
		var op = 0.1;
    element.style.opacity = op;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += 0.1;
    }, time/10);
	}
	//----------------------------------------modal close
	document.getElementById('overlay').onclick = function(){
		modalForm.style.opacity = 0;
		modalForm.style.display = 'none';
		fadeOut(overlay, 200);
	};

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
	var template = document.getElementById('set').innerHTML;
	var html = tmpl(template,settings);
	document.getElementById('search__settings').innerHTML = html;

/*-------------------FILLING QUERY--------------*/
	var request = new XMLHttpRequest();
	function ajax(url){
		request.open('GET',url);
		request.onreadystatechange = function(){
			if(request.status === 200 && request.readyState === 4){
				var resObj = JSON.parse(request.responseText);
				if (resObj.totalHits == 0){
					document.getElementById('results__list').innerHTML = 'Простите, мы не смогли найти совпадений';
				}else{
					var template = document.getElementById('results__template').innerHTML;
					var html = tmpl(template, resObj);
					document.getElementById('results__list').innerHTML = html;

					//-----------------Modal open-----------------------
					var images = document.getElementsByClassName('result__img');
					for(var i=0; i < images.length; i++){
						images[i].onclick = function(){
							var href = this.parentNode.dataset.url;
							fadeIn(overlay,200);
							modalForm.innerHTML = "<img src='"+href+"'>";
							fadeIn(modalForm,200);
							modalForm.style.opacity = '1';
						}
					}
				}
			}else{
				(function(){
					setTimeout(100,function(){
						if(request.status !== 200)
							document.getElementById('results__list').innerHTML = 'Ошибка соединения';
					});
				});
			}
		}
		request.send();
	};

//-----------link on main page----------------

	document.getElementsByClassName('logo--results')[0].onclick = function(){
		searchFieldMain.value = '';
		document.getElementById('results').style.display = 'none';
		document.getElementById('main-page').style.display = 'block';
	};

//-----------search on main page--------------

	document.getElementsByClassName('search-form--main')[0].onsubmit = function(event){
		event.preventDefault();
		var url="https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(this.elements[0].value);
		ajax(url);
		searchFieldResults.value = searchFieldMain.value;
		document.getElementById('results').style.display = 'block';
		document.getElementById('main-page').style.display = 'none';
	};

//----------search on results page -------------

	document.getElementsByClassName('search-form--results')[0].onsubmit = function(event){
		event.preventDefault();
		var q = document.getElementsByClassName('search__field--results')[0].value;
		var sort = document.getElementById('sort').value;
		var image_type = document.getElementById('image_type').value;
		var orientation = document.getElementById('orientation').value;
		var category = document.getElementById('category').value;
		var minWidth = document.getElementById('min-width').value;
		var minHeight = document.getElementById('min-height').value;

		var url = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(q)+"&image_type="+image_type+"&order="+sort+"&orientation="+orientation+"&category="+category+"&min_width="+minWidth+"&min_height="+minHeight;
		ajax(url);
		searchFieldResults.value = q;
	};
};