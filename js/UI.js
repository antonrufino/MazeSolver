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
	this.cellSize = 30;
	this.background = '#000';
	this.emptyCell = '#2a2a2a';
	this.cellColor = '#ee0000'; //00eeee
	this.cellState = false;
	this.cells = [];
}

UI.prototype.init = function() {
	canvas = document.getElementById('field');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	}
	
	this.numRows = Math.floor((canvas.height - 1) / Life.UI.cellSize);
	this.numCols = Math.floor((canvas.width - 1) / Life.UI.cellSize);
	
	for (var i = 0; i < this.numRows; ++i) {
	    this.cells[i] = [];
	    for (var j = 0; j < this.numCols; ++j) {
	        this.cells[i][j] = false;
	    }
	} 
}

UI.prototype.fillCell = function (mouseX, mouseY) {
	var cellX = Math.floor(mouseX / this.cellSize); 
	var cellY = Math.floor(mouseY / this.cellSize);
	
	ctx.fillStyle = this.cellState ? this.cellColor : this.emptyCell;
	ctx.fillRect(cellX * this.cellSize + 1, cellY * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
	
	return {
		row: cellY,
		col: cellX
	};
}

UI.prototype.drawFrame = function () {
	ctx.fillStyle = this.background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < this.cells.length; ++i) {
		for (var j = 0; j < this.cells[i].length; ++j) {
			if (this.cells[i][j]) {
				ctx.fillStyle = this.cellColor;
			} else {
				ctx.fillStyle = this.emptyCell;
			}
			
			ctx.fillRect(j * this.cellSize + 1, i * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
		}
	}
}
