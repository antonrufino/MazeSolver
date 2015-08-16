function Solver() {
	this.maze = [];
	this.distances = [];
	this.visited = [];
	this.path = [];
	this.numNodes = 0;
	this.start = 0;
	this.dest = 0;
}

Solver.prototype.init = function () {
	this.numNodes = Life.UI.numRows * Life.UI.numCols;
	this.dest = this.numNodes - 1;
	
	for (var i = 0; i < this.numNodes; ++i) {
	    this.distances[i] = null;
	    this.visited[i] = false;
	    this.path[i] = null;
	}
	
	//Initialize adjacency matrix
	for (var i = 0; i < this.numNodes; ++i) {
	    this.maze[i] = [];
	    for (var j = 0; j < this.numNodes; ++j) {
	        this.maze[i][j] = false;
	    }
	}
	
    //Initialize graph edges
	for (var i = 0; i < Life.UI.numRows; ++i) {
	    for (var j = 0; j < Life.UI.numCols; ++j) {
	        var currentNode = i * Life.UI.numCols + j
	        var rightNode = i * Life.UI.numCols + j + 1; //Node to the right of current
	        var belowNode = (i + 1) * Life.UI.numCols + j; //Node below current 
	        
	        if (i != Life.UI.numRows - 1 || j != Life.UI.numCols -1) {
	            if (i == Life.UI.numRows - 1) {
	                this.maze[currentNode][rightNode] = true;
	                this.maze[rightNode][currentNode] = true;
	            } else if (j == Life.UI.numCols - 1) {
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
}

Solver.prototype.switchNodeState = function(row, col, state) {
    var currentNode = row * Life.UI.numCols + col
    var aboveNode = (row - 1) * Life.UI.numCols + col; //Node above current 
    var leftNode = row * Life.UI.numCols + col - 1; //Node to the left of current
    var belowNode = (row + 1) * Life.UI.numCols + col; //Node below current
    var rightNode = row * Life.UI.numCols + col + 1; //Node to the right of current
    
    if (currentNode == this.start || currentNode == this.dest) {
        return;
    }
    
    if (row != 0) {
        this.maze[currentNode][aboveNode] = 
            this.maze[currentNode][aboveNode] == state ? this.maze[currentNode][aboveNode] : state;
        this.maze[aboveNode][currentNode] = this.maze[currentNode][aboveNode];
    }
    
    if (col != 0) {
        this.maze[currentNode][leftNode] = 
            this.maze[currentNode][leftNode] == state ? this.maze[currentNode][leftNode] : state;
        this.maze[leftNode][currentNode] = this.maze[currentNode][leftNode];
    }
    
    if (row != Life.UI.numRows - 1) {
        console.log("hello");
        this.maze[currentNode][belowNode] = 
            this.maze[currentNode][belowNode] == state ? this.maze[currentNode][belowNode] : state;
        this.maze[belowNode][currentNode] = this.maze[currentNode][belowNode];
    }
    
    if (col != Life.UI.numCols - 1) {
        this.maze[currentNode][rightNode] = 
            this.maze[currentNode][rightNode] == state ? this.maze[currentNode][rightNode] : state;
        this.maze[rightNode][currentNode] = this.maze[currentNode][rightNode];
    }
}
