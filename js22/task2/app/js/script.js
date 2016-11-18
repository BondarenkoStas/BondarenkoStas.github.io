/* What was used from ES6?
let inside for cicles
operator spread ... for option array in formQuestion args
default falues on count points functions' args
"arrows" functions in form questions
template strings in score check
iterators instead of simple for cicle changet remove "let i"
*/

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
	let formOption=(name,text,value)=>(
		{name:name,text:text,value:value});
	let formQuestion=(title,name,answer,...option)=>(
		{title: title,name: name,option: option,answer: answer})

	//------------------COUNT POINTS--------------------

	function scoreMax(t=test){
		var score = 0;
		for (let rad of t.radio)
			score++;
		for(let check of t.checkbox) 
			score += check.answer.length;
		for (let sel of t.select)
			score += sel.answer.length;
		return score;
	}
	function scoreCheck(t=test){
		var score = 0;
		for (let rad of t.radio)
			if($(`[name=${rad.name}]`).filter(':checked').val() == rad.answer)
				score++;
		for (let check of t.checkbox)
			$(`[name="${check.name}"] input`).filter(':checked').each(function(){
				if($.inArray(parseInt($(this).val()), check.answer) != -1)
					score++;
			});
		for (let sel of t.select)
			$(`[name="${sel.name}"] option`).filter(':selected').each(function(){
				if($.inArray(parseInt($(this).val()), sel.answer) != -1)
					score++;
			});
		return score;
	}
	function unSet(){
		$(':checked').prop("checked",false);
		$(':selected').prop('selected',false);
	}

	//------------------FILLING TEST-----------------

	test.radio.push(formQuestion("Столица страны Уругвай","radio1",1,
		formOption("option1","Монтевидео",1)
		,formOption("option2","Асунсьон",2)
		,formOption("option3","Сан-Хосе",3)
		,formOption("option4","Вильнюс",4)
	));
	test.checkbox.push(formQuestion("Какие из этих стран являются островами?","checkbox1",[2,4],
		formOption("checkbox1 option1","Гайана",1)
		,formOption("checkbox1 option2","Гваделупа",2)
		,formOption("checkbox1 option3","Гватемала",3)
		,formOption("checkbox1 option4","Острова Кайман =)",4)
		,formOption("checkbox1 option5","Сан-Марино",5)
		,formOption("checkbox1 option6","Андорра",6)
	));
	test.select.push(formQuestion("Какая из этих территорий не имеет постоянного населения","select1",[1,5,6],
		formOption("select1 option1","Шпицберген",1)
		,formOption("select1 option2","Мартиника",2)
		,formOption("select1 option3","Гавайи",3)
		,formOption("select1 option4","Бруней",4)
		,formOption("select1 option5","Южные сандвичевые острова",5)
		,formOption("select1 option6","Мидуэй",6)
	));

	//-----------------------FILLING PAGE-------------------

	localStorage['test'] = JSON.stringify(test);
	var forRender = JSON.parse(localStorage['test']);
	var content = tmpl(html,forRender);
	$('body').append(content);

//-------------------------ANSWERS LIMIT------------------

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

//--------------------------MODAL WINDOW----------------------

	$('#submit').on('click', function(event){
		var text = '<h3>Результаты теста</h3><p>Ваш результат: '+scoreCheck(test)+'/'+scoreMax();
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