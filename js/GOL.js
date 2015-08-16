function GOL() {
	this.numRows = 0;
	this.numCols = 0;
	this.currentGeneration = [];
	this.nextGeneration = [];
	this.population = 0;
}

GOL.prototype.init = function () {
	this.numRows = Math.floor((canvas.height - 1) / Life.UI.cellSize);
	this.numCols = Math.floor((canvas.width - 1) / Life.UI.cellSize);
	
	for(var i = 0; i < this.numRows; ++i) {
		this.currentGeneration[i] = [];
		this.nextGeneration[i] = [];
		
		for(var j = 0; j < this.numCols; ++j) {
			this.currentGeneration[i][j] = false;
			this.nextGeneration[i][j] = false;
		}
	}
}

GOL.prototype.getNumberOfNeighbors = function (row, col) {
	var neighbors = [
                this.currentGeneration[row][(col - 1 + this.numCols) % this.numCols],
                this.currentGeneration[(row + 1 + this.numRows) % this.numRows][(col - 1 + this.numCols) % this.numCols],
                this.currentGeneration[(row + 1 + this.numRows) % this.numRows][col],
                this.currentGeneration[(row + 1 + this.numRows) % this.numRows][(col + 1 + this.numCols) % this.numCols],
                this.currentGeneration[row][(col + 1 + this.numCols) % this.numCols],
                this.currentGeneration[(row - 1 + this.numRows) % this.numRows][(col + 1 + this.numCols) % this.numCols],
                this.currentGeneration[(row - 1 + this.numRows) % this.numRows][col],
                this.currentGeneration[(row - 1 + this.numRows) % this.numRows][(col - 1 + this.numCols) % this.numCols]
            ];
	var numNeighbors = 0;
	
	for (var i = 0; i < neighbors.length; ++i) {
		if (neighbors[i]) {
			++numNeighbors;
		}
	}
	
	return numNeighbors;
}

GOL.prototype.getNextGeneration = function () {
	var i, j;
	
	this.nextGeneration = this.currentGeneration;
	for (i = 0; i < this.numRows; ++i) {
		for (j = 0; j < this.numCols; ++j) {
			var count = this.getNumberOfNeighbors(i, j);
			
			if (this.currentGeneration[i][j]) {
				if (count < 2 || count > 3) {
					this.nextGeneration[i][j] = false;
				}
			} else if (count == 3) {
				this.nextGeneration[i][j] = true;
			}
		}
	}
	this.currentGeneration = this.nextGeneration;
}	

GOL.prototype.getPopulation = function () {
	var population = 0;
	for (var i = 0; i < this.numRows; ++i) {
		for (var j = 0; j < this.numCols; ++j) {
			if (this.currentGeneration[i][j]) {
				++population;
			}
		}
	}
	
	this.population = population;
}
