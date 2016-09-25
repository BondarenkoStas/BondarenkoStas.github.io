window.onload = function() {
	var testGen = {
		form : '',
		listQuestion : '',
		question : '',

		createForm: function(parent) {
			this.form = document.createElement('form');
			parent.appendChild(this.form);
		},

		createHeader: function(textHeader) {
			var header = document.createElement('h2');
			header.innerHTML = textHeader;
			header.classList.add('text-center');
			this.form.appendChild(header);
		},

		createListQuestion: function() {
			this.listQuestion = document.createElement('ol');
			this.form.appendChild(this.listQuestion);
		},

		createQuestion: function(textQuestion) {
			var li = document.createElement('li');
			var textQ = document.createElement('h4');
			textQ.appendChild(document.createTextNode(textQuestion));
			li.appendChild(textQ);

			this.question = document.createElement('ul');
			this.question.style.listStyle = 'none';
			li.appendChild(this.question);			

			li.classList.add('checkbox');
			li.style.margin = '20px 0';
			this.listQuestion.appendChild(li);
		},

		createOption: function(textOption) {
			var li = document.createElement('li');
			var label = document.createElement('label');
			var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			label.appendChild(checkbox);
			label.appendChild(document.createTextNode(textOption));
			li.appendChild(label);
      this.question.appendChild(li);
		},

		createButton: function(textButton) {
			var button = document.createElement("button"); 
			button.innerHTML = textButton; 
			button.setAttribute('type', 'submit');
			button.classList.add('btn'); 
			button.classList.add('btn-primary'); 
			button.classList.add('center-block'); 
			button.classList.add('btn-lg');
			this.form.appendChild(button); 
		}
	};

	var body = document.querySelector("body");
	var num_questions = 3;
	var num_options = 3;

	testGen.createForm(body);
	testGen.createHeader('Тест по программированию');
	testGen.createListQuestion();
	for(var i = 1; i <= num_questions; i++) {
		testGen.createQuestion('Вопрос №'+i);
		for (var j = 1; j <= num_options; j++) {
			testGen.createOption('Вариант ответа №'+j);
		}
	}
	testGen.createButton('Проверить мои результаты');
};