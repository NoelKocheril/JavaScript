function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	if(random(1) >= 0.5){
		this.isAlive = false;
	} else {
		this.isAlive = true;
	}
}

Cell.prototype.show = function() {
	stroke(0);
	noFill();
	if(this.isAlive){
		fill(0);
	}
	rect(this.x, this.y, this.w, this.w);
}