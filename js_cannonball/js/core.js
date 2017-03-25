function Vector3(){
	this.x = 0;
	this.y = 0;
	this.z = 0;

	if(arguments.length==0){
		this.x=0;
		this.y=0;
		this.z=0;
	}
	else if(!isNaN(arguments[0]) && !isNaN(arguments[1]) && !isNaN(arguments[2])){
		this.x=arguments[0];
		this.y=arguments[1];
		this.z=arguments[2];
	}		
	else if(arguments[0] instanceof Vector3){
		var args = arguments[0];
		this.x = args.x;
		this.y = args.y;
		this.z = args.z;
	}
}

Vector3.prototype.invert = function(){
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
}
Vector3.prototype.magnitude = function(){
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}
Vector3.prototype.squareMagnitude = function(){
	return this.x*this.x+this.y*this.y+this.z*this.z;
}
Vector3.prototype.multipleConstUpdate = function(value){
	this.x *= value;
	this.y *= value;
	this.z *= value;
}
Vector3.prototype.multipleConst = function(value){
	return new Vector3(this.x*value, this.y*value, this.z*value);
}
Vector3.prototype.additionVector = function(v){
	return new Vector3(this.x+v.x,this.y+v.y,this.z+v.z);
}
Vector3.prototype.substractVector = function(v){
	return new Vector3(this.x-v.x,this.y-v.y,this.z-v.z);
}
Vector3.prototype.addScaledVector = function(v, scale){
	return new Vector3(this.x+v.x*scale, this.y+v.y*scale, this.z+v.z*scale);
}
Vector3.prototype.addScaledVectorUpdate = function(v,scale){
	this.x += v.x*scale;
	this.y += v.y*scale;
	this.z += v.z*scale;
}
Vector3.prototype.componentProduct = function(v){
	return new Vector3(this.x*v.x,this.y*v.y,this.z*v.z);
}
Vector3.prototype.componentProductUpdate = function(v){
	this.x*=v.x;
	this.y*=v.y;
	this.z*=v.z;
}
Vector3.prototype.scalarProduct = function(v){
	return this.x*v.x + this.y*v.y + this.z*v.z;
}
Vector3.prototype.vectorProduct = function(v){
	return new Vector3(this.y*v.z-this.z*v.y,
		this.z*v.x - this.x*v.z, 
		this.x*v.y - this.y*v.x);
}
Vector3.prototype.trim = function(size){
	if(this.squareMagnitude() > size*size){
		this.normalize();
		this.x *= size;
		this.y *= size;
		this.z *= size;
	}
}
Vector3.prototype.equalToVector3 = function(other){
	return this.x == other.x && this.y==other.y && this.z==other.z;
}
Vector3.prototype.lessThenVector3 = function(other){
	return this.x<other.x && this.y<other.y && this.z<other.z;
}
Vector3.prototype.clear = function(){
	this.x = this.y = this.z = 0;
}
Vector3.prototype.normalize = function(){
	var vec = new Vector3(this);
	var l = this.magnitude();
	if(l>0) 
		vec.multipleConstUpdate(1.0/l);
	return vec;
}