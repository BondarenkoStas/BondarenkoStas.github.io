/* What was used from ES6?
let inside for cicles
operator spread ... for option array in formQuestion args
default falues on count points functions' args
"arrows" functions in form questions
template strings in score check
iterators instead of simple for cicle changet remove "let i"
*/

'use strict';

$(function () {
	var html = $('#result').html();
	var test = {
		h1: "Знания стран и столиц",
		radio: [],
		checkbox: [],
		select: []
	};
	var formOption = function formOption(name, text, value) {
		return { name: name, text: text, value: value };
	};
	var formQuestion = function formQuestion(title, name, answer) {
		for (var _len = arguments.length, option = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
			option[_key - 3] = arguments[_key];
		}

		return { title: title, name: name, option: option, answer: answer };
	};

	//------------------COUNT POINTS--------------------

	function scoreMax() {
		var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : test;

		var score = 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = t.radio[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var rad = _step.value;

				score++;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = t.checkbox[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var check = _step2.value;

				score += check.answer.length;
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = t.select[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var sel = _step3.value;

				score += sel.answer.length;
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return score;
	}
	function scoreCheck() {
		var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : test;

		var score = 0;
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = t.radio[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var rad = _step4.value;

				if ($('[name=' + rad.name + ']').filter(':checked').val() == rad.answer) score++;
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			var _loop = function _loop() {
				var check = _step5.value;

				$('[name="' + check.name + '"] input').filter(':checked').each(function () {
					if ($.inArray(parseInt($(this).val()), check.answer) != -1) score++;
				});
			};

			for (var _iterator5 = t.checkbox[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				_loop();
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			var _loop2 = function _loop2() {
				var sel = _step6.value;

				$('[name="' + sel.name + '"] option').filter(':selected').each(function () {
					if ($.inArray(parseInt($(this).val()), sel.answer) != -1) score++;
				});
			};

			for (var _iterator6 = t.select[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				_loop2();
			}
		} catch (err) {
			_didIteratorError6 = true;
			_iteratorError6 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion6 && _iterator6.return) {
					_iterator6.return();
				}
			} finally {
				if (_didIteratorError6) {
					throw _iteratorError6;
				}
			}
		}

		return score;
	}
	function unSet() {
		$(':checked').prop("checked", false);
		$(':selected').prop('selected', false);
	}

	//------------------FILLING TEST-----------------

	test.radio.push(formQuestion("Столица страны Уругвай", "radio1", 1, formOption("option1", "Монтевидео", 1), formOption("option2", "Асунсьон", 2), formOption("option3", "Сан-Хосе", 3), formOption("option4", "Вильнюс", 4)));
	test.checkbox.push(formQuestion("Какие из этих стран являются островами?", "checkbox1", [2, 4], formOption("checkbox1 option1", "Гайана", 1), formOption("checkbox1 option2", "Гваделупа", 2), formOption("checkbox1 option3", "Гватемала", 3), formOption("checkbox1 option4", "Острова Кайман =)", 4), formOption("checkbox1 option5", "Сан-Марино", 5), formOption("checkbox1 option6", "Андорра", 6)));
	test.select.push(formQuestion("Какая из этих территорий не имеет постоянного населения", "select1", [1, 5, 6], formOption("select1 option1", "Шпицберген", 1), formOption("select1 option2", "Мартиника", 2), formOption("select1 option3", "Гавайи", 3), formOption("select1 option4", "Бруней", 4), formOption("select1 option5", "Южные сандвичевые острова", 5), formOption("select1 option6", "Мидуэй", 6)));

	//-----------------------FILLING PAGE-------------------

	localStorage['test'] = JSON.stringify(test);
	var forRender = JSON.parse(localStorage['test']);
	var content = tmpl(html, forRender);
	$('body').append(content);

	//-------------------------ANSWERS LIMIT------------------

	$(':checkbox').on('click', function () {
		var $block = $(this).parents('[data-max]');
		if ($block.find(':checked').length > $block.data('max')) this.checked = false;
	});
	$('option').on('click', function () {
		var $block = $(this).parents('[data-max]');
		if ($block.find(':selected').length > $block.data('max')) this.selected = false;
	});

	//--------------------------MODAL WINDOW----------------------

	$('#submit').on('click', function (event) {
		var text = '<h3>Результаты теста</h3><p>Ваш результат: ' + scoreCheck(test) + '/' + scoreMax();
		unSet();
		$('#overlay').fadeIn(400, function () {
			$('#modal_form').find('#for_test').html(text).end().css('display', 'block').animate({ opacity: 1, top: '50%' }, 200);
		});
	});
	$('#modal_close, #overlay').on('click', function () {
		$('#modal_form').animate({ opacity: 0, top: '45%' }, 200, function () {
			$(this).css('display', 'none');
			$('#overlay').fadeOut(400);
		});
	});
});