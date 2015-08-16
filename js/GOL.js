function Solver() {
	this.maze = [];
	this.distances = [];
	this.visited = [];
	this.path = [];
	this.numNodes = 0;
}

GOL.prototype.init = function () {
	this.numNodes = numRows * numCols;
	
	for (var i = 0; i < numNodes; ++i) {
	    this.distances[i] = null;
	    this.visited[i] = false;
	    this.path[i] = null;
	}
	
	//Initialize adjacency matrix
	for (var i = 0; i < this.numNodes; ++i) {
	    maze[i] = [];
	    for (var j = 0; j < this.numNodes; ++j) {
	        maze[i][j] = false;
	    }
	}
	
    //Initialize graph edges
	for (var i = 0; i < Life.UI.numRows; ++i) {
	    for (var j = 0; j < Life.UI.numCols; ++j) {
	        currentNode = i * Life.UI.numCols + j
	        if (i != Life.UI.numRows - 1 && j != Life.UI.numCols -1) {
	            if (i == Life.UI.numRows - 1) {
	                maze[currentNode][currentNode + 1] = true;
	            } else if (j = Life.UI.numCols - 1) {
	                maze[currentNode + 1][currentNode] = true;
	            } else {
	                maze[currentNode][currentNode + 1] = true;
	                maze[currentNode + 1][currentNode] = true;
	            }
	        }
	    }
	}
}


