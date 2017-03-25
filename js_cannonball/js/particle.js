function Particle(){
	this.position = new Vector3();
	this.velocity = new Vector3();
	this.forceAccum = new Vector3();
	this.acceleration = new Vector3();
	this.damping = 1.0;
	this.inverseMass = 1.0;
}
Particle.prototype.integrate = function(duration){
	if (this.inverseMass <= 0 || duration < 0) return;

	this.position.addScaledVectorUpdate(this.velocity,duration);

	var resultingAcc = this.acceleration;

	//console.log(this.acceleration);
//	console.log(this.forceAccum);
	resultingAcc.addScaledVectorUpdate(this.forceAccum, this.inverseMass);

//	console.log(resultingAcc);

	this.velocity.addScaledVectorUpdate(resultingAcc,duration);

	//this.velocity.multipleConstUpdate(Math.pow(this.damping,duration));
	this.velocity.x*=Math.pow(this.damping,duration);

	//this.clearAccumulator();
}
Particle.prototype.setMass = function(mass){
	if (mass != 0) 
		this.inverseMass = 1.0/mass;
}
Particle.prototype.getMass = function(){
	if (this.inverseMass == 0) 
		return Infinity;
	else 
		return 1.0/this.inverseMass;
}
Particle.prototype.setInverseMass = function(inMass){
	this.inverseMass = inMass;
}
Particle.prototype.getInverseMass = function(){
	return this.inverseMass;
}
Particle.prototype.hasFiniteMass = function(){
	return this.inverseMass >= 0.0;
}
Particle.prototype.setDamping = function(damp){
	this.damping = damp;
}
Particle.prototype.getDamping = function(){
	return this.damping;
}
Particle.prototype.setPosition = function(x,y,z){
	if(arguments[0] instanceof Vector3) {
		this.position = arguments[0];
	} else{
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;			
	}
}
Particle.prototype.getPosition = function(){
	return this.position;
}
Particle.prototype.setVelocity = function(x,y,z){
	if (arguments[0] instanceof Vector3)
		this.velocity = arguments[0];
	else{
		this.velocity.x = x;
		this.velocity.y = y;
		this.velocity.z = z;
	}
}
Particle.prototype.getVelocity = function(){
	return this.velocity;
}
Particle.prototype.setAcceleration = function(x,y,z){
	if (arguments[0] instanceof Vector3)
		this.acceleration = arguments[0];
	else{
		this.acceleration.x = x;
		this.acceleration.y = y;
		this.acceleration.z = z;
	}
}
Particle.prototype.getAcceleration = function(){
	return this.acceleration;
}
Particle.prototype.clearAccumulator = function(){
	this.forceAccum.clear();
}
Particle.prototype.addForce = function(force){
	this.forceAccum = this.forceAccum.additionVector(force);
}