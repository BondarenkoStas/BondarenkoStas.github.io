$(function(){
	var html = $('#result').html();
	var BondarenkoStas = {
		name: 'Станислав Бондаренко',
		imgSrc: 'img/photo.jpg',
		imgAlt: 'personal photo',
		prof: 'Студент НТУУ "КПИ"',
		reasons: ['Интересуюсь программированием'
			,'Хочу высокую зароботную плату'
			,'Есть время и желание'],
		number: '+380970860340',
		socHref: 'https://new.vk.com/ssssstasssss',
		feedback: 'Большая дорога начинается с маленього шага'
	}
	var content = tmpl(html, BondarenkoStas);
	$('body').append(content);
});