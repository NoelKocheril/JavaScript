//Conway's Game of Life

//Cell
/*
* isMine - Boolean
* i,j,x,y,w,h
* isAlive - Boolean
* 
* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
* 
* 
*/

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

let grid;
let grid_Width = 800;
let grid_Height = 800;
let cols;
let rows;
let totalMines = 10;
let w = 8;

function setup() {
	createCanvas(grid_Width+1, grid_Height+1);
	cols = floor(grid_Width / w);
	rows = floor(grid_Height / w);
	grid = make2DArray(cols, rows);
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j] = new Cell(i,j,w);
		}
	}
}

function draw() {
	background(255);
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}
	
	
	let next = make2DArray(cols, rows);
	for(let x = 0; x < cols; x++){
		for(let y = 0; y < rows; y++){
			next[x][y] = new Cell(x,y,w);
			let total = countNeighbours(x,y);
			if (total === 3 && (!grid[x][y].isAlive)){
				next[x][y].isAlive = true;
			} else if((total > 3 || total < 2)){
				next[x][y].isAlive = false;
			} else {
				next[x][y].isAlive = grid[x][y].isAlive;
			}
		}
	}
	grid = next;
}

function countNeighbours(x,y) {
	let total = 0;
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			if(xoff == 0 && yoff == 0){
				continue;
			}
			let i = x + xoff;
			let j = y + yoff;
			if(i > -1 && i < cols && j > -1 && j < rows){
				let neighbour = grid[i][j];
				if(neighbour.isAlive){
					total++;
				}
			}
		}
	}
	return total;
}

