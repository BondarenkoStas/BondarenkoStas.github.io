window.onload = function() {
	var max = document.documentElement.clientWidth;
	var sLeft = document.querySelector('.screen--left');
	var sMiddle = document.querySelector('.screen--middle');
	var sRight = document.querySelector('.screen--right');
	var run = false;
	var ms = 0, ss = 0, mm = 0, hh = 0;
	var startTime, contTime = 0;
	var timer;

	var middle = new function() {
		var self = this;
		var block_left = document.querySelector('.block_left');
		var block_right = document.querySelector('.block_right');
		function addText(text, block) {
			for(var i = 0; i < 10; i++) {
				var t = document.createElement('p');
				t.appendChild(document.createTextNode(text));
				t.style.opacity = 1-i/6;
				t.classList.add('middle_text');
				block.appendChild(t);
			}
		};
		self.addAllText = function(block_left_text, block_right_text) {
			addText(block_left_text, block_left);
			addText(block_right_text, block_right);
		};
		self.addListeners = function() {
			block_left.addEventListener('click', function(){
				screenShift('+', [-max, 0, max], 'none', 'block');});		
			block_right.addEventListener('click', function(){
				screenShift('-', [-max, 0, max], 'block', 'none');});
		};
	};

	var left = new function(){
		var self = this;
		self.bBackRight = sLeft.querySelector('.btn-back--right');
		self.bStart = sLeft.querySelector('.bStart');
		self.bClear = sLeft.querySelector('.bClear');
		self.display = sLeft.querySelector('.display');
		self.displayMs = sLeft.querySelector('.display_ms');
		function start() {
			if (run)
				startRun(contTime + Date.now() - startTime, left);
			else{
				startTime = Date.now();
				startNotRun(left);
			}
		};
		function clear() {
			clearInterval(timer);
			timerHandler(0, left);
			contTime = 0;
			run = false;
			self.bStart.className = 'button button-start bStart';
			self.bStart.innerHTML = 'Start';
		};
		self.addListeners = function(){
			self.bBackRight.addEventListener('click', function(){
				screenShift('-', [0, max, 2*max], 'none', 'block');
				clear();
			});
			self.bStart.addEventListener('click', start);
			self.bClear.addEventListener('click', clear);
		};
	};

	var right = new function(){
		var self = this;
		var buttonsSC = document.querySelector('.buttons-s-c');		
		var arrButtons = [];
		var aTT = [0,0,0,0,0,0];
		var countDigits = 0;
		var setFlag = false;
		self.timeS = sRight.querySelector('.time');
		self.bBackLeft = sRight.querySelector('.btn-back--left');
		self.bStart = sRight.querySelector('.bStart');
		self.bClear = sRight.querySelector('.bClear');
		self.display = sRight.querySelector('.display');
		self.displayMs = sRight.querySelector('.display_ms');
		self.countTime = 0;
		function start(){
			if (setFlag) {
				if (run)
					startRun(contTime + startTime - Date.now(), right);
		    else{
					startTime = Date.now();
		    	startNotRun(right);
		    }
			} else {
				document.querySelector('.buttons--right').style.display = 'none';
				var hours = aTT[0]+''+aTT[1];
				var mins = aTT[2]+''+aTT[3];
				var secs = aTT[4]+''+aTT[5];
				self.countTime = 1000*(3600*hours + 60*mins + 1*secs);
				timerHandler(self.countTime, right);
				self.bStart.innerHTML = 'Start';
				self.bClear.className = 'button button-clear--danger bClear';
				buttonsSC.style.width = '63%';
				buttonsSC.style.display = 'block';
				setFlag = true;
			}		
		};
		function clear() {
			clearInterval(timer);
			contTime = 0;
			run = false;	
			self.timeS.style.backgroundColor = 'azure';		
			if (setFlag) {
				timerHandler(right.countTime, right);
				self.bStart.className = 'button button-start bStart';
				self.bStart.innerHTML = 'Start';
			} else {
				timerHandler(0, right);
				aTT = [0,0,0,0,0,0];
				countDigits = 0;
				document.querySelector('.buttons--right').style.display = 'inline-block';
				buttonsSC.style.width = '29%';
				buttonsSC.style.display = 'inline-block';
				self.bStart.innerHTML = 'Set';
				self.bStart.className = 'button button-start bStart';
				self.bClear.className = 'button button-clear--default bClear';
			}			
		};
		self.addButtons = function() {
			for(var i = 0; i < 10; i++) {
				var button = document.createElement('button');
				button.className = 'button digits__item';
				button.appendChild(document.createTextNode(i));
				arrButtons.push(button);
				if (i > 4)
					document.querySelector('.digits--5-9').appendChild(button);
				else
					document.querySelector('.digits--0-4').appendChild(button);
			};
		};
		self.addListeners = function() {
			self.bBackLeft.addEventListener('click', function() {
				screenShift('+', [-2*max, -max, 0], 'block', 'none');
				setFlag = false;
				clear();
			});
			self.bStart.addEventListener('click', start);
			self.bClear.addEventListener('click', clear);
			countDigits = 0;
			for (var i = 0; i < 10; i++)
			 	arrButtons[i].addEventListener('click', function(){
			 		if (countDigits || this.innerHTML != '0') { 
			 			aTT.shift();
				 		aTT.push(this.innerHTML);				 		
					 	countDigits++;
					 	if (countDigits > 6) {
					 		aTT = [0,0,0,0,0,0];
					 		countDigits = 0;
					 	}
				 		self.display.innerHTML = aTT[0]+''+aTT[1]+':'+aTT[2]+aTT[3]+':'+aTT[4]+aTT[5];
			 		}
			 	});		
		};
	};

	var screens = [sLeft, sMiddle, sRight];
	var screensObjects = [left, middle, right];

	function screenShift(d_sign, posL, posM, posR, disBL, disBR) {
		left.bBackRight.style.display = disBR;
		right.bBackLeft.style.display = disBL;
		var diff = 0;
		var d = 10;
		for (var i = 0; i < 3; i++)
			screens[i].style.left = arguments[1][i] + 'px';
		var timer = setInterval(function(){
			for(var i = 0; i < 3; i++)
				screens[i].style.left = +(d_sign + d) + parseInt(screens[i].style.left) + 'px';
			diff += d;
			if (diff >= max)
				clearInterval(timer);
		}, 1);
	};
	function timerHandler(allTime, obj) {
		if (obj == right && allTime < 0) {
			clearInterval(timer);
			obj.timeS.style.backgroundColor = 'red';
			allTime = 0;
		}
		obj.display.innerHTML = forTime(allTime);
		obj.displayMs.innerHTML = forMs(allTime);
	};
	function forTime(allTime) {
		ss = ((allTime/1000)%60)>>0;
		mm = ((allTime/1000/60)%60)>>0;
		hh = ((allTime/1000/60/60))>>0;
		return addZeroes(hh,2)+':'+addZeroes(mm,2)+':'+addZeroes(ss,2);
	};
	function forMs(allTime) {
		ms = allTime % 1000;
		return addZeroes(ms, 3);
	};
	function addZeroes(number, length) {
    var stringNum = String(number);
    while (stringNum.length < length)
        stringNum = '0' + stringNum;
    return stringNum;
  };
  function startRun(time, obj){
  	contTime = time;
    clearInterval(timer);
    run = false;
    obj.bStart.innerHTML = "Continue";
    obj.bStart.className = 'button button-start bStart';
  };
  function startNotRun(obj){
		startTime = Date.now();
		if (obj == left) {
			timer = setInterval(function(){
				timerHandler(Date.now() - startTime + contTime, obj);
			}, 54);
		}	else {
			timer = setInterval(function(){
				timerHandler(right.countTime + startTime - Date.now() + contTime, obj);
			},54);
		}
		run = true;
		obj.bStart.innerHTML = "Pause";
    obj.bStart.className = 'button button-pause bStart';
  };

	middle.addAllText('Stop Watch', 'Count Down');
	right.addButtons();
	for(var i = 0; i < 3; i++)
		screensObjects[i].addListeners();
}