var canvas, ctx;
var width, height;
var startLoad=0, endLoad=0;
var keyLeft=false, keyRight=false, keyUp=false, keyDown=false, keySpace=false;
var lastTime;
var lastFire;
var objectImage, bgImage, bulletImage, playerImage;
var bg;
var player=[];
var bullets=[];
var explosions=[];
var gameTime;
var playerSpeed=0.4;

var pixelsForMetr = 100;

var bulletType = 'pistol';


var bulletsInfo = {
	pistol: {
		mass:2,
		velocity:{x:35,y:0},
		acceleration:{x:0,y:1},
		damping:0.99,
		force:{x:0,y:0},
		timeBetweenBullets:200,
		width:36,
		height:11,
		col:0,
		row:0
	},
	artillery: {
		mass:200,
		velocity:{x:40,y:-30},
		acceleration:{x:0,y:20},
		damping:0.99,
		force:{x:0,y:0},
		timeBetweenBullets:500,
		width:44,
		height:48,
		col:37,
		row:0
	},
	fireball:{
		mass:1,
		velocity:{x:10,y:0},
		damping:0.9,
		acceleration:{x:0,y:-0.6},
		force:{x:0,y:0},
		timeBetweenBullets:500,
		width:48,
		height:49,
		col:83,
		row:0
	},
	laser:{
		mass:0.1,
		velocity:{x:100,y:0},
		damping:0.99,
		acceleration:{x:0,y:0},
		force:{x:0,y:0},
		timeBetweenBullets:0,
		width:130,
		height:10, 
		col:0,
		row:53
	}
};

function main(){
	clear();

	var times = Date.now();
	var dt = times - lastTime;

	ctx.fillStyle = bg;
	ctx.fillRect(0,0,width,height);

	gameTime+=dt;

	setKey(dt);
	drawPlayer(dt);

	drawBullet(dt/1000);
	drawExplosionss(dt);

	lastTime = times;
	requestAnimFrame(main);
}

function keyMovePlayer(val, dt, sign, compare){
	player[val] += playerSpeed*dt;
	if(sign){
		if (player[val] < compare) player[val] = compare;
	}else{
		if (player[val] > compare) player[val] = compare;
	}
}

function setKey(dt){
	if(keyLeft) keyMovePlayer('x', -dt, true, 0);
	if(keyRight) keyMovePlayer('x', dt, false, width-player.w);
	if(keyUp) keyMovePlayer('y', -dt, true, 0);
	if(keyDown) keyMovePlayer('y', dt, false, height-player.h);
	if(keySpace){
		if((Date.now()-lastFire)>bulletsInfo[bulletType].timeBetweenBullets){
			var x = player.x+player.w;
			var y = player.y+5;
			var bulletParticle = new Particle;
			var bInfo = bulletsInfo[bulletType];

	 		bulletParticle.clearAccumulator();
	 		bulletParticle.setPosition(x,y,0);
	 		bulletParticle.setMass(bInfo.mass);
	 		bulletParticle.setVelocity(new Vector3(bInfo.velocity.x*pixelsForMetr
	 			, bInfo.velocity.y*pixelsForMetr,0));
	 		bulletParticle.setAcceleration(new Vector3(bInfo.acceleration.x*pixelsForMetr
	 			, bInfo.acceleration.y*pixelsForMetr,0));
	 		bulletParticle.setDamping(bInfo.damping);
	 		bulletParticle.addForce(new Vector3(bInfo.force.x*pixelsForMetr
	 			,bInfo.force.y*pixelsForMetr,0));
	
			bullets.push({
				bullet:bulletParticle
				,width:bInfo.width
				,height:bInfo.height
				,col:bInfo.col
				,row:bInfo.row
			});
			lastFire = Date.now();
		}

	}
}

function drawBullet(dt){
	bullets.forEach(function(b,i,bullets){
		b.bullet.integrate(dt);
		var position = b.bullet.getPosition();
		ctx.drawImage(bulletImage
			,b.col,b.row
			,b.width,b.height
			,position.x,position.y
			,b.width,b.height
		);

		var explosionY  = (position.y>height-30) ? height-30:position.y;
		var explosionX = (position.x>width-30) ? width-30:position.x;

		if(position.y > height-30 || position.x > width-30){
			explosions. push({x:explosionX,y:explosionY,
				row:0,col:39,w:39,h:39,action:0,count:13});
			bullets.splice(i,1);
			i--;
		}
	});
}

function drawPlayer(dt){
	player.action++;
	if(player.action==player.count) player.action=0;
	ctx.drawImage(playerImage, player.col
		, player.row, player.w, player.h, player.x
		, player.y, player.w, player.h
	);
}
function drawExplosionss(dt){
	explosions.forEach(function(e,i,explosions){
		ctx.drawImage(objectImage,(e.col*e.action),
			e.row,e.w,e.h,e.x,e.y,e.w,e.h);
		e.action++;
		if(e.action==e.count){
			i--;
		}
	});
}

function clear(){
	ctx.clearRect(0,0,width,height);
}

function startLoadFunction(){
	startLoad++;
	startLoad++;
	objectImage = new Image();
	objectImage.onload = function(){endLoadFunction();};
	objectImage.src= 'img/sprites.png';

	startLoad++;
	bgImage = new Image();
	bgImage.onload = function(){endLoadFunction();};
	bgImage.src = 'img/bg.jpg';

	startLoad++;
	playerImage = new Image();
	playerImage.onload = function(){endLoadFunction();};
	playerImage.src = 'img/pistolet.png';

	startLoad++;
	bulletImage = new Image();
	bulletImage.onload = function(){endLoadFunction();};
	bulletImage.src = 'img/bullet.png';


	player.w=133;
	player.h=88;	
	player.x=0;
	player.y=height-player.h;
	player.row = 0;
	player.col = 0;

	endLoadFunction();
}

function endLoadFunction(){
	endLoad++;
	if(startLoad==endLoad){
		start();
	}
}

function start(){
	bg = ctx.createPattern(bgImage,'repeat');
	lastFire=Date.now();
	lastTime=Date.now();
	main();
}

var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback,1000/60);
	};
})();

function keySwitch(event,value){
	switch(event.keyCode){
		case 32: keySpace=value; break;
		case 37: keyLeft=value; break;
		case 38: keyUp=value; break;
		case 39: keyRight=value; break;
		case 40: keyDown=value; break;
	}
}

function changeNumberBoxes(){	
  		document.querySelector("#vX").value = bulletsInfo[bulletType].velocity.x;
  		document.querySelector("#vY").value = bulletsInfo[bulletType].velocity.y;
  		document.querySelector("#aX").value = bulletsInfo[bulletType].acceleration.x;
  		document.querySelector("#aY").value = bulletsInfo[bulletType].acceleration.y;
  		document.querySelector("#damp").value = bulletsInfo[bulletType].damping;
}

window.onload = function(){
	var type = document.querySelectorAll(".bulletType");
	type.forEach(function(radio,i,type){
		radio.onchange = function() {
	  		bulletType = radio.value;
	  		changeNumberBoxes();
		};
	});
	var options = document.querySelectorAll(".option");
	options.forEach(function(option,i,options){
		option.onchange = function(){
			var val = option.value;
			switch(option.id){
				case "vX": bulletsInfo[bulletType].velocity.x=val; break;
				case "vY": bulletsInfo[bulletType].velocity.y=val; break;
				case "aX": bulletsInfo[bulletType].acceleration.x=val; break;
				case "aY": bulletsInfo[bulletType].acceleration.y=val; break;
				case "damp": bulletsInfo[bulletType].damping=val; break;
			}
		};
	});

	canvas=document.querySelector('#canvas');
	ctx = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
  	canvas.height = window.innerHeight-110;

	width = canvas.width;
	height = canvas.height;

	startLoadFunction();
	window.addEventListener( "keydown", function(event){
		keySwitch(event,true);
	}, true);
	window.addEventListener("keyup", function(event){
		keySwitch(event,false);
	}, true);
	changeNumberBoxes();
};