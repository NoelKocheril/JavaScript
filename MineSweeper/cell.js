function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.neighbourCount;
	this.isMine = false;
	this.isRevealed = false;
	this.isMarked = false;
}

Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);
	if(this.isRevealed){
		if (this.isMarked){
			fill(255,0,0);
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
		} else if(this.isMine){
			fill(127);
			ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
		} else {
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if(this.neighbourCount != 0){
				textAlign(CENTER);
				fill(0);
				text(this.neighbourCount,this.x+this.w*0.5,this.y+this.w*0.6);
			}
		}
	}
}

Cell.prototype.contains = function(x,y) {
	return ((x > this.x) && (x < (this.x + this.w)) && (y > this.y) && (y < (this.y + this.w)));		
}

Cell.prototype.reveal = function() {
	this.isRevealed = true;
	if(this.neighbourCount == 0){
		//Breath Fill
		this.floodFill();
	}
}

Cell.prototype.setMine = function() {
	this.isMine = true;
}

Cell.prototype.setMarked = function() {
	this.isMarked = true;
}

Cell.prototype.countNeighbours = function(){
	if (this.isMine)
		return;
	var total = 0;
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if(i > -1 && i < cols && j > -1 && j < rows){
				var neighbour = grid[i][j];
				if (neighbour.isMine){
					total++;
				}
			}
		}
	}
	this.neighbourCount = total;
}


Cell.prototype.floodFill = function(){
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if(i > -1 && i < cols && j > -1 && j < rows){
				var neighbour = grid[i][j];
				if (!neighbour.isMine && !neighbour.isRevealed){
					neighbour.reveal();
				}
			}
		}
	}
}
