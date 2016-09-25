window.onload = function() {
	var screen = new function(){
		var run = false, splitAlready = false;
		var countSplits = 0;
		var ms = 0, ss = 0, mm = 0, hh = 0;
		var startTime, contTime = 0;
		var timer;
		var self = this;
		var bStart = document.querySelector('.bStart');
		var bSplit = document.querySelector('.bSplit');
		var bReset = document.querySelector('.bReset');
		var display = document.querySelector('.display');
		var blockSplit = document.querySelector('.splits');
		function start() {
			if (run) {
				contTime = contTime + Date.now() - startTime;
		    clearInterval(timer);
		    run = false;
				splitAlready = false;
		    bStart.innerHTML = "Start";
		    bStart.className = 'button button-start bStart';
		    countSplits++;
		    tSplit = document.createElement('p');
		  	tSplit.classList.add('splits__item');
		  	tSplit.appendChild(document.createTextNode(countSplits+' Stop: '+display.innerHTML));
		  	blockSplit.appendChild(tSplit);
			}
			else{
				startTime = Date.now();
				timer = setInterval(function(){
					display.innerHTML = forTime(Date.now() - startTime + contTime);
				}, 54);
				run = true;
				bStart.innerHTML = "Stop";
		    bStart.className = 'button button-stop bStart';
			}
		};
		function reset() {
			clearInterval(timer);
			display.innerHTML = forTime(0);
			contTime = 0;
			run = false;
			bStart.className = 'button button-start bStart';
			bStart.innerHTML = 'Start';
			countSplits = 0;
			splitAlready = false;
			blockSplit.innerHTML = '';
		};
		function forTime(allTime) {
			ss = addZeroes((((allTime/1000)%60)>>0),2);
			mm = addZeroes((((allTime/1000/60)%60)>>0),2);
			hh = addZeroes((((allTime/1000/60/60))>>0),2);
			ms = addZeroes((allTime % 1000),3);
			return hh+':'+mm+':'+ss+'.'+ms;
		};
		function addZeroes(number, length) {
	    var stringNum = String(number);
	    while (stringNum.length < length)
	        stringNum = '0' + stringNum;
	    return stringNum;
	  };
	  function split() {
	  	if ((splitAlready || run) && ms) {
	  		if (!run)	
		  		splitAlready = true;
		  	countSplits++;
		  	tSplit = document.createElement('p');
		  	tSplit.classList.add('splits__item');
		  	tSplit.appendChild(document.createTextNode(countSplits+' Split: '+display.innerHTML));
		  	blockSplit.appendChild(tSplit);
		  }
	  }
		self.addListeners = function(){
			bStart.addEventListener('click', start);
			bSplit.addEventListener('click', split);
			bReset.addEventListener('click', reset);
		};
	};
  screen.addListeners();
}