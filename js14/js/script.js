'use strict';
$(function(){
	var html = $('#result').html();
	var test = 
	{
		h1: "Знания стран и столиц"
		,radio:[]
		,checkbox:[]
		,select:[]
	};
	function formOption(name, text, value){
		return {name: name,text: text,value: value};
	}
	function formQuestion(title,name,answer,option){
		return {title: title,name: name,option: option,answer: answer};
	}

	//------------------ПОДСЧЕТ БАЛЛОВ--------------------

	function scoreMax(test){
		var score = 0;
		for (var i = 0; i < test.radio.length; i++, score++);
		for (var i = 0; i < test.checkbox.length; i++)
			score += test.checkbox[i].answer.length;
		for (var i = 0; i < test.select.length; i++)
			score += test.select[i].answer.length;
		return score;
	}
	function scoreCheck(test){
		var score = 0;
		for (var i = 0; i < test.radio.length; i++){
			if($('[name='+test.radio[i].name+']').filter(':checked').val() == test.radio[i].answer)
				score++;
		}
		for (var i = 0; i < test.checkbox.length; i++){
			var obj = test.checkbox[i];
			$('[name="'+obj.name+'"] input').filter(':checked').each(function(){
				if($.inArray(parseInt($(this).val()), obj.answer) != -1)
					score++;
			});
		}
		for (var i = 0; i < test.select.length; i++){
			var obj = test.select[i];
			$('[name="'+obj.name+'"] option').filter(':selected').each(function(){
				if($.inArray(parseInt($(this).val()), obj.answer) != -1)
					score++;
			});
		}
		return score;
	}
	function unSet(){
		$(':checked').prop("checked",false);
		$(':selected').prop('selected',false);
	}


	//------------------ЗАПОЛНЕНИЕ ТЕСТА-----------------

	test.radio.push(formQuestion("Столица страны Уругвай","radio1",1,
		[formOption("option1","Монтевидео",1)
			,formOption("option2","Асунсьон",2)
			,formOption("option3","Сан-Хосе",3)
			,formOption("option4","Вильнюс",4)
		] 
	));
	test.checkbox.push(formQuestion("Какие из этих стран являются островами?","checkbox1",[2,4],
		[formOption("checkbox1 option1","Гайана",1)
			,formOption("checkbox1 option2","Гваделупа",2)
			,formOption("checkbox1 option3","Гватемала",3)
			,formOption("checkbox1 option4","Острова Кайман =)",4)
			,formOption("checkbox1 option5","Сан-Марино",5)
			,formOption("checkbox1 option6","Андорра",6)
		]
	));
	test.select.push(formQuestion("Какая из этих территорий не имеет постоянного населения","select1",[1,5,6],
		[formOption("select1 option1","Шпицберген",1)
			,formOption("select1 option2","Мартиника",2)
			,formOption("select1 option3","Гавайи",3)
			,formOption("select1 option4","Бруней",4)
			,formOption("select1 option5","Южные сандвичевые острова",5)
			,formOption("select1 option6","Мидуэй",6)
		]
	));

	//-----------------------НАПОЛНЕНИЕ СТРАНИЦЫ-------------------

	localStorage['test'] = JSON.stringify(test);
	var forRender = JSON.parse(localStorage['test']);
	var content = tmpl(html,forRender);
	$('body').append(content);



//-------------------------ОГРАНИЧИТЕЛИ ОТВЕТОВ------------------

	$(':checkbox').on('click', function() {
		var $block = $(this).parents('[data-max]');
		if ($block.find(':checked').length > $block.data('max'))
	    this.checked = false;
	});
	$('option').on('click', function() {
		var $block = $(this).parents('[data-max]');
		if ($block.find(':selected').length > $block.data('max'))
	    this.selected = false;
	});

//--------------------------МОДАЛЬНОЕ ОКНО----------------------

	$('#submit').on('click', function(event){
		var text = '<h3>Результаты теста</h3><p>Ваш результат: '+scoreCheck(forRender)+'/'+scoreMax(forRender);
		unSet();
		$('#overlay').fadeIn(400, 
		 	function(){
				$('#modal_form')
					.find('#for_test').html(text).end()
					.css('display', 'block')
					.animate({opacity: 1, top: '50%'}, 200);
		});
	});
	$('#modal_close, #overlay').on('click',function(){
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,
				function(){
					$(this).css('display', 'none');
					$('#overlay').fadeOut(400);
				}
			);
	});
});