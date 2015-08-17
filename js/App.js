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

var app, current;

function App() {
	this.paused = true;
	this.stop = stop;
	this.run = run;
	this.reset = reset;
	this.clear = clear;

	this.UI = new UI();
	this.Solver = new Solver();
	
	this.mouseDown = false;
}

App.prototype.init = function() {
	this.UI.init();
	this.Solver.init();
	
	this.UI.drawFrame();
	
	setGUI();
	
	canvas.addEventListener('mousedown', mouseDownHandler, false);
	canvas.addEventListener('mouseup', mouseUpHandler, false);
	canvas.addEventListener('mousemove', mouseMoveHandler, false);
	canvas.addEventListener('click', clickHandler, false);
}

function animate() {
     if (app.UI.path.length != 0) {
        current = app.UI.path.splice(0, 1)[0];
        
        var position = app.Solver.nodeToPosition(current);
        app.UI.fillCell(position.row, position.col, app.UI.pathColor);
        
        window.requestAnimFrame(animate)
     }
}

function run() {
    app.Solver.init();
    app.Solver.initMaze(app.UI.cells);
    app.UI.path = app.Solver.bfs();
    app.UI.drawFrame();
    animate();
}

function reset() {
    this.UI.drawFrame()
}

function clear() {
    this.Solver.init();
	this.UI.init();
	this.UI.drawFrame();
}

function getPosition(x, y) {
    return {
		row: Math.floor(y / app.UI.cellSize),
		col: Math.floor(x / app.UI.cellSize)
	};
}

function mouseDownHandler(e) {
    var position = getPosition(e.clientX, e.clientY);
    if (position.row < app.UI.numRows && position.col < app.UI.numCols) {
	    app.mouseDown = true;
	    position = getPosition(e.clientX, e.clientY);
	    app.UI.cellState = !app.UI.cells[position.row][position.col];
	    app.UI.cells[position.row][position.col] = app.UI.cellState;

        var color = app.UI.cellState == 1 ? app.UI.wallColor : app.UI.emptyCell;
	    app.UI.fillCell(position.row, position.col, color);
	    app.UI.drawFrame();
    }
}

function mouseUpHandler(e) {
	app.mouseDown = false;
}

function mouseMoveHandler(e) {
	if (app.mouseDown) {
		var position = getPosition(e.clientX, e.clientY);
	    if (position.row < app.UI.numRows && position.col < app.UI.numCols) {
	        var color = app.UI.cellState == 1 ? app.UI.wallColor : app.UI.emptyCell;
	        app.UI.cells[position.row][position.col] = app.UI.cellState;
	        app.UI.fillCell(position.row, position.col, color);
	    }
	}
}

function clickHandler(e) {
	var position = getPosition(e.clientX, e.clientY);
	if (position.row < app.UI.numRows && position.col < app.UI.numCols) {
	    var color = app.UI.cellState == 1 ? app.UI.wallColor : app.UI.emptyCell;
	    app.UI.cells[position.row][position.col] = app.UI.cellState;
	    app.UI.fillCell(position.row, position.col, color);
	    app.UI.drawFrame();
	}
}

function setGUI() {
	var gui = new dat.GUI();
	gui.add(app, 'run');
	gui.add(app, 'clear');
}

window.addEventListener('load', function () {
	app = new App();
	app.init();
}, false);
