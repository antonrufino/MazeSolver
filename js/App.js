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

var Life;

function App() {
	this.paused = true;
	this.start = start;
	this.stop = stop;
	this.run = run;
	this.reset = reset;

	this.UI = new UI();
	this.GOL = new GOL();
	
	this.mouseDown = false;
}

App.prototype.init = function() {
	this.UI.init();
	this.GOL.init();
	
	this.UI.drawFrame(this.GOL);
	
	setGUI();
	
	canvas.addEventListener('mousedown', mouseDownHandler, false);
	canvas.addEventListener('mouseup', mouseUpHandler, false);
	canvas.addEventListener('mousemove', mouseMoveHandler, false);
	canvas.addEventListener('click', clickHandler, false);
}

function run() {
	Life.GOL.getNextGeneration();
	Life.UI.drawFrame(Life.GOL);

	Life.GOL.getPopulation();
	if (Life.GOL.population == 0) {
		Life.paused = true;
	}
	
	if (!Life.paused) {
		console.log('tick');
		window.requestAnimFrame(run);
	}
}

function start() {
	this.paused = false;
	this.run();
}

function stop() {
	this.paused = true;
}

function reset() {
	this.paused = true;
	this.GOL.init();
	this.GOL.population = 0;
	this.UI.drawFrame(Life.GOL);
}

function mouseDownHandler(e) {
	Life.mouseDown = true;
	
	var position = (function () {
		return {
			row: Math.floor(e.clientY / Life.UI.cellSize),
			col: Math.floor(e.clientX / Life.UI.cellSize)
		};
	})();
	
	Life.UI.cellState = !Life.GOL.currentGeneration[position.row][position.col];
}

function mouseUpHandler(e) {
	Life.mouseDown = false;
}

function mouseMoveHandler(e) {
	if (Life.mouseDown) {
		var position = Life.UI.fillCell(e.clientX, e.clientY, Life.GOL);
		Life.GOL.currentGeneration[position.row][position.col] = Life.UI.cellState;
		Life.GOL.getPopulation()
	}
}

function clickHandler(e) {
	var position = Life.UI.fillCell(e.clientX, e.clientY, Life.GOL);
	Life.GOL.currentGeneration[position.row][position.col] = Life.UI.cellState;
	Life.GOL.getPopulation()
}

function setGUI() {
	var gui = new dat.GUI();
	gui.add(Life.GOL, 'population').listen();
	gui.add(Life, 'start');
	gui.add(Life, 'stop');
	gui.add(Life, 'reset');
}

window.addEventListener('load', function () {
	Life = new App();
	Life.init();
}, false);