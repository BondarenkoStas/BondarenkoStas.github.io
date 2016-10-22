$(function(){
	var data;
	$.ajax({
    url: 'js/data.txt',
		async:false,
    success: function(d) {data=JSON.parse(d);}
	});
	
	console.log('исходный массив ',data);
	console.log('1. Отсортированный по алфавиту массив неповторяющихся скиллов');

	var skills = _.chain(data)
		.map('skills')
		.flatten()
		.each(function(v,k,c){c[k]=_.lowerCase(v);})
		.uniq()
		.sortBy()
		.value();
	console.log(skills);

	console.log('2. Массив имен людей по возрастанию количества их друзей');
	var nameByFriends = _.chain(data)
		.sortBy(['friends.length','name'])
		.map('name')
		.value()
	console.log(nameByFriends);


	console.log('3. Массив друзей пользователей без повторений (по алфавиту)');
	var friends  = _.chain(data)
		.map('friends')
		.flatten()
		.map('name')
		.uniq()
		.sortBy()
		.value();
	console.log(friends);
	
});