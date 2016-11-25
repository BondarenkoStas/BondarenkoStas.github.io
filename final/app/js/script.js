window.onload = function(){
	//---------------------sliders-------------------------------
	var sliders = [];
	for(var i=1;i<=3;i++){
		sliders[i] = new tns({
			container: document.querySelector('.sl'+i),
			items: 1,
			controlsContainer: document.querySelector('.controls'+i)
		});
	}

	function getPictures(request){
		var r = new XMLHttpRequest();
		var request;
		var q = request ? '&q='+encodeURIComponent(request) : '';
		var url = "https://pixabay.com/api/?key=2654122-2e7cfe65e4216a71a55f9c97a&image_type=photo"+q+"&callback=?";
		r.onreadystatechange = function(data) {
			if (this.readyState == 4 && this.status == 200) {
				var str = this.responseText;
				var d = str.substring(1,str.length-1);
				var dat = JSON.parse(d);
				addImage(dat);
			}
		};
		r.open("POST", url, true);
		setInterval(r.send(),150);
	}

	function addImage(data){
		var items = document.getElementsByClassName("grid-item");
		for(var i = 0; i < items.length; i++){
			items[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center"; 
			items[i].style.backgroundSize = "cover";
			items[i].innerHTML = "<div class='grid__text-field'><p class='grid__text'>"+data.hits[i].tags+"</p></div>";
		}
	}

	var someQuery = ['travelling','autumn','green','honey','money','car','mountain','time','rose','spring'];
	getPictures(someQuery[Math.floor(Math.random()*10)]);

	var searchButton = document.querySelector('.search__button');
	searchButton.addEventListener('click',function(e){
		var searchInput = document.querySelector('.search__input');
		var query = searchInput.value;
		if(query!="") {
			getPictures(query);
			searchInput.value = "";
		}
	});
};	