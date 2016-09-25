var option = prompt('if you want to check 1st task, enter 0;' + 
	' to check 2nd enter 1');

// Home Task 1

if (option == 0) {
	function pow(number, exponent) {
		number = Number(parseInt(number));
		index = Number(parseInt(exponent));
		if (isNaN(number) || isNaN(exponent) || !(number && exponent))
			return 'wrong data';

		var res = 1;
		if (exponent < 0)
			for(var i = exponent; i < 0; i++, res/=number);
		for(var i = 1; i <= exponent; i++, res*=number);
		return res;
	}

	var number = prompt('Enter number');
	var exponent = prompt('Enter exponent');
	console.log(number + ' ^ ' + exponent + ' = ' + pow(number, exponent));
} 

//Home Task 2
	else if (option == 1) {
		var sizeOfArray = 5;
		var arrNames = [];
		var i;
		for(i = 0; i < sizeOfArray; i++)
			arrNames[i] = prompt('Введите ' + (i+1) + ' имя');

		var userName = prompt('Введите имя пользователя');
		for (i = 0; i < sizeOfArray; i++)
			if (userName == arrNames[i] && userName) {
				alert(userName + ', вы успешно вошли');
				break;
			}
		if (i == sizeOfArray)
			alert('Ошибка, имя пользователя не найдено');
	}
	else alert('wrong option');