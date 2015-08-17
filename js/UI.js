/*
    Copyright (C) 2014  Anton Rufino

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var canvas, ctx;

function UI() {
	this.cellSize = 15;
	this.background = '#000';
	this.emptyCell = '#2a2a2a';
	this.wallColor = '#111';
	this.pathColor = '#00eeee';
	this.terminalColor = '#e00';
	this.cellState = false;
	this.cells = [];
	this.numRows = 0;
	this.numCols = 0;
	this.path = [];
}

UI.prototype.init = function() {
	canvas = document.getElementById('field');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	}
	
	this.numRows = Math.floor((canvas.height - 1) / app.UI.cellSize);
	this.numCols = Math.floor((canvas.width - 1) / app.UI.cellSize);
	
	for (var i = 0; i < this.numRows; ++i) {
	    this.cells[i] = [];
	    for (var j = 0; j < this.numCols; ++j) {
	        this.cells[i][j] = false;
	    }
	} 
	
	this.path = []
}

UI.prototype.fillCell = function (row, col, color) {
	ctx.fillStyle = color;
	ctx.fillRect(col * this.cellSize + 1, row * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
}

UI.prototype.drawFrame = function () {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = this.background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < this.cells.length; ++i) {
		for (var j = 0; j < this.cells[i].length; ++j) {
			if (this.cells[i][j]) {
				ctx.fillStyle = this.wallColor;
			} else {
				ctx.fillStyle = this.emptyCell;
			}
			
			ctx.fillRect(j * this.cellSize + 1, i * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
		}
	}
	
	var destPosition = app.Solver.nodeToPosition(app.Solver.dest);
    
    ctx.fillStyle = this.terminalColor;
    ctx.fillRect(1, 1, this.cellSize - 2, this.cellSize - 2);
    ctx.fillRect(destPosition.col * this.cellSize + 1, destPosition.row * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
}
