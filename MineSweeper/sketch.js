//Minesweeper

//Cell
/*
* isMine - Boolean
* x,y,w,h
* isRevealed - Boolean
* 3 Possibles Situations
* 1 - Mine
* 2 - Number
* 3 - Empty
*/

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var grid_Width = 400;
var grid_Height = 400;
var cols;
var rows;
var totalMines = 10;
var w = 40;

function setup() {
	createCanvas(grid_Width+1,grid_Height+1);
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2DArray(cols,rows);
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			grid[i][j] = new Cell(i,j,w);
		}
	}
	
	//Create totalMines Num Mines
	for(var n = 0; n < totalMines; n++){
		var i = floor(random(cols));
		var j = floor(random(rows));
		if(!grid[i][j].isMine){
			grid[i][j].setMine();
		} else {
			n--;
		}
	}
	
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			grid[i][j].countNeighbours();
		}
	}
}

function mousePressed(){
	background(255);
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			if(grid[i][j].contains(mouseX,mouseY)){
				grid[i][j].reveal();
				
				if(grid[i][j].isMine){
					this.gameOver();
				}
			}
		}
	}
}

function draw() {
	background(255);
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}
}

function gameOver(){
	for(var i = 0; i < cols; i++){
		for(var j = 0; j < rows; j++){
			grid[i][j].reveal();
		}
	}
}