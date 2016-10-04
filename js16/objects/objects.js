//---------------------Factory Function method-----------

/*function Human(name,age,gender,height,weight){
	var _name = name;
	var _age = age;
	var _gender = gender;
	var _height = height;
	var _weight = weight;
	return {
		name: function(name){
			if (!arguments.length) return _name;
			_name = name;},
		age: function(age){
			if (!arguments.length) return _age;
			_age = age;},
		gender: function(gender){
			if (!arguments.length) return _gender;
			_gender = gender;},
		height: function(height){
			if (!arguments.length) return _height;
			_height = height;},
		weight: function(weight){
			if (!arguments.length) return _weight;
			_weight = weight;}
	}
}

function Worker(name,age,gender,height,weight,position,salary){
	var me = Human(name,age,gender,height,weight);
	var _position = position;
	var _salary = salary;
	me.position = function(position){
			if (!arguments.length) return _position;
			_position = position;};
	me.salary = function(salary){
			if (!arguments.length) return _salary;
			_salary = salary;};
	this.work = function(){
		console.log('My name is '+me.name()+' and i like to work as '+me.position());
	};	
	me.constructor = arguments.callee;
	return me;
}

function Student(name,age,gender,height,weight,school, scolarship){
	var me = Human(name,age,gender,height,weight);
	var _school = school;
	var _scolarship = scolarship;
	me.school = function(school){
			if (!arguments.length) return _school;
			_school = school;};
	me.scolarship = function(scolarship){
			if (!arguments.length) return _scolarship;
			_scolarship = scolarship;};
	me.watchTvSeries = function(seriesName){
		console.log('My name is '+me.name()+' and now I\'m watching '+seriesName);
	};
	me.constructor = arguments.callee;
	return me;
}

var Vasya = new Student('Vasya',20,'male',175,80,'kpi',830);
console.log(Vasya);
console.log(Vasya.age());
Vasya.age(21);
console.log(Vasya.age());
var Vova = new Worker('Vova',30,'male',180,90,'junior dev',4000);
console.log(Vova);
console.log(Vova.position());
Vova.position('senjor dev');
console.log(Vova.position());*/

//----------------------------OOP method-----------------

function Human(name,age,gender,height,weight){
	this.name = name;
	this.age = age;
	this.gender = gender;
	this.height = height;
	this.weight = weight;
}
function Worker(name,age,gender,height,weight, position, salary){
	var self = this;
	Human.apply(self, arguments);
	self.position = position;
	self.salary = salary;
	self.work = function(){
		console.log('My name is '+self.name+' and i like to work as '+self.position);
	};	
}
function Student(name,age,gender,height,weight,school, scolarship){
	var self = this;
	Human.apply(self, arguments);
	self.school = school;
	self.scolarship = scolarship;
	self.watchTvSeries = function(seriesName){
		console.log('My name is '+self.name+' and now I\'m watching '+seriesName);
	};
}

var Vova = new Worker('Vova',30,'male',180,90,'junior dev',4000);
console.log(Vova);
console.log(Vova.height);
var Vasya = new Student('Vasya',20,'male',175,80,'kpi',830);
Vasya.watchTvSeries('The simpsons');