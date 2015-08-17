function Solver() {
	this.maze = [];
	this.queue = [];
	this.distances = [];
	this.visited = [];
	this.path = [];
	this.numNodes = 0;
	this.start = 0;
	this.dest = 0;
}

Solver.prototype.init = function () {
	this.numNodes = app.UI.numRows * app.UI.numCols;
	this.dest = this.numNodes - 1;
	this.queue = [];
	this.queue.push(this.start);
	
	for (var i = 0; i < this.numNodes; ++i) {
	    this.distances[i] = -1;
	    this.visited[i] = false;
	    this.path[i] = null;
	}
	
	this.distances[this.start] = 0;
}

Solver.prototype.initMaze = function(cells) {
    //Initialize adjacency matrix
	for (var i = 0; i < this.numNodes; ++i) {
	    this.maze[i] = [];
	    for (var j = 0; j < this.numNodes; ++j) {
	        this.maze[i][j] = false;
	    }
	}
	
    //Initialize graph edges
	for (var i = 0; i < app.UI.numRows; ++i) {
	    for (var j = 0; j < app.UI.numCols; ++j) {
	        var currentNode = i * app.UI.numCols + j
	        var rightNode = i * app.UI.numCols + j + 1; //Node to the right of current
	        var belowNode = (i + 1) * app.UI.numCols + j; //Node below current 
	        
	        if (i != app.UI.numRows - 1 || j != app.UI.numCols -1) {
	            if (i == app.UI.numRows - 1) {
	                this.maze[currentNode][rightNode] = true;
	                this.maze[rightNode][currentNode] = true;
	            } else if (j == app.UI.numCols - 1) {
	                this.maze[currentNode][belowNode] = true;
	                this.maze[belowNode][currentNode] = true;
	            } else {
	                this.maze[currentNode][rightNode] = true;
	                this.maze[rightNode][currentNode] = true;
	                
	                this.maze[currentNode][belowNode] = true;
	                this.maze[belowNode][currentNode] = true;
	            }
	        }
	    }
	}
	
	for (var i = 0; i < cells.length; ++i) {
	    for (var j = 0; j < cells[i].length; ++j) {
	        this.switchNodeState(i, j, !cells[i][j]);
	    }
	}
}

Solver.prototype.switchNodeState = function(row, col, state) {
    var currentNode = row * app.UI.numCols + col
    var aboveNode = (row - 1) * app.UI.numCols + col; //Node above current 
    var leftNode = row * app.UI.numCols + col - 1; //Node to the left of current
    var belowNode = (row + 1) * app.UI.numCols + col; //Node below current
    var rightNode = row * app.UI.numCols + col + 1; //Node to the right of current
    
    if (currentNode == this.start || currentNode == this.dest) {
        return;
    }
    
    if (row != 0) {
        if (state && this.maze[currentNode][aboveNode] || !state) {
            this.maze[currentNode][aboveNode] = state;
            this.maze[aboveNode][currentNode] = state;
        }
    }
    
    if (col != 0) {
        if (state && this.maze[currentNode][leftNode] || !state) {
            this.maze[currentNode][leftNode] = state;
            this.maze[leftNode][currentNode] = state;
        }
    }
    
    if (row != app.UI.numRows - 1) {
        if (state && this.maze[currentNode][belowNode] || !state) {
            this.maze[currentNode][belowNode] = state;
            this.maze[belowNode][currentNode] = state;
        }
    }
    
    if (col != app.UI.numCols - 1) {
        if (state && this.maze[currentNode][rightNode] || !state) {
            this.maze[currentNode][rightNode] = state;
            this.maze[rightNode][currentNode] = state;
        }
    }
}

Solver.prototype.bfs = function() {
    while (this.queue.length != 0) {
        var current = this.queue[0];
        this.queue.splice(0, 1);
        
        if (this.visited[current]) {
            continue;
        }
            
        this.visited[current] = true;
        
        if (current == this.dest) {
            break;
        }
        
        for (var i = 0; i < this.numNodes; ++i) {
            if (this.maze[current][i] && !this.visited[i]) {
                var alt = this.distances[current] + 1;
                if (alt < this.distances[i] || this.distances[i] == -1) {
                    this.path[i] = current;
                    this.distances[i] = alt;
                }
                
                this.queue.push(i); 
            }
        }    
        
    }
    
    return this.path;
}
    
Solver.prototype.nodeToPosition = function(node) {
    return {
        row: Math.floor(node / app.UI.numCols),
        col: node % app.UI.numCols
    }
} 
