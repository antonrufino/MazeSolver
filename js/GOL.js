function Solver() {
	this.numRows = 0;
	this.numCols = 0;
	this.maze = [];
	this.distances = [];
	this.visited = [];
	this.path = [];
	this.numNodes = 0;
}

GOL.prototype.init = function () {
	this.numRows = Math.floor((canvas.height - 1) / Life.UI.cellSize);
	this.numCols = Math.floor((canvas.width - 1) / Life.UI.cellSize);
	this.numNodes = numRows * numCols;
	
	for (var i = 0; i < numNodes; ++i) {
	    this.distances[i] = null;
	    this.visited[i] = false;
	    this.path[i] = null;
	}
	
	for (var i = 0; i < this.numNodes; ++i) {
	    maze[i] = [];
	    for (var j = 0; j < this.numNodes; ++j) {
	        maze[i][j] = false;
	    }
	}
	
	for (var i = 0; i < this.numRows; ++i) {
	    for (var j = 0; j < this.numCols; ++j) {
	        currentNode = i * this.numCols + j
	        if (i != this.numRows - 1 && j != this.numCols -1) {
	            if (i == this.numRows - 1) {
	                maze[currentNode][currentNode + 1] = true;
	            } else if (j = this.numCols - 1) {
	                maze[currentNode + 1][currentNode] = true;
	            } else {
	                maze[currentNode][currentNode + 1] = true;
	                maze[currentNode + 1][currentNode] = true;
	            }
	        }
	    }
	}
}


