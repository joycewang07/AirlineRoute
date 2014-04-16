var startNode;
var endNode;
var currentNode;
var currentNodeIndex = 0;
var path;
var animationMove;
var backendGrid;

var initializeGraphic = function (scale, cellSize, renderTo) {
    var realCellSize = cellSize;

    var rootDiv = Ext.DomHelper.append(renderTo, {tag: 'div', cls: 'grid_root', id: 'rootCell',
        style: 'width: ' + (cellSize * scale) + 'px; height: ' + (cellSize * scale ) + 'px'}, true);

    for (var x = 0; x < scale; x++) {
        var rowDiv = Ext.DomHelper.append(rootDiv, {tag: 'div', cls: 'grid_row', id: 'row_' + x}, true);
        for (var y = 0; y < scale; y++) {
            var cellSpan = Ext.DomHelper.append(rowDiv, {tag: 'span', cls: 'grid_item',
                //   id: 'cell_' + x + '_' + y, style: 'width: ' + realCellSize + 'px; height: ' + realCellSize + 'px'}, true);
                id: x + '_' + y, style: 'width: ' + realCellSize + 'px; height: ' + realCellSize + 'px'}, true);
            cellSpan.addListener('click', onGridItemClick);
        }
    }
    // initialize backend grid
    backendGrid = initGrid(scale);
}

var initGrid = function (scale) {
    var grid = new Array(scale);
    for (var x = 0; x < scale; x++) {
        grid[x] = new Array(scale);
        for (var y = 0; y < scale; y++) {
            grid[x][y] = new Cell(x, y);
        }
    }
    return grid;
}

var onGridItemClick = function (evt, el, o) {
    var cellId = el.getAttribute('id');
    var startSelected = Ext.getCmp("start");
    var endSelected = Ext.getCmp("end");
    var obstacleSelected = Ext.getCmp("obstacle");
    var pieces = cellId.split("_");
    var x = parseInt(pieces[0]);
    var y = parseInt(pieces[1]);
    if (startSelected.getValue()) {
        startNode = new Cell(x, y);
        Ext.get(cellId).setStyle("background-color", "#000000");
    } else if (endSelected.getValue()) {
        endNode = new Cell(x, y);
        Ext.get(cellId).setStyle("background-color", "#000000");
    } else if (obstacleSelected.getValue()) {
        backendGrid[x][y].isWall = true;
        Ext.get(cellId).setStyle("background-color", "#000000");
    }
}


function move() {
    if (currentNodeIndex < path.length) {
        currentNode = path[currentNodeIndex];
        Ext.get(currentNode.x + "_" + currentNode.y).setStyle("background-color", "#05C705");
        currentNodeIndex++;
    } else {
        window.clearInterval(animationMove);
    }
}

var animatePath = function () {
    path = astarSearch(backendGrid, startNode, endNode);
    animationMove = window.setInterval(function () {move()}, 1000);
}

var stopMove = function myStopFunction() {
    //window.clearInterval(myVar);
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
    this.cost = 1;
    this.isWall = false;
}

var neighbours = function (grid, node) {
    var ret = [];
    var x = node.x;
    var y = node.y;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
        ret.push(grid[x - 1][y]);
    }
    // East
    if (grid[x + 1] && grid[x + 1][y]) {
        ret.push(grid[x + 1][y]);
    }
    // South
    if (grid[x] && grid[x][y - 1]) {
        ret.push(grid[x][y - 1]);
    }
    // North
    if (grid[x] && grid[x][y + 1]) {
        ret.push(grid[x][y + 1]);
    }
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
        ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
        ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
        ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
        ret.push(grid[x + 1][y + 1]);
    }
    return ret;
}

var astarSearch = function (grid, start, end) {
    var openHeap = new BinaryHeap(function (node) {
        return node.f
    });
    openHeap.push(start);

    while (openHeap.size() > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var currentNode = openHeap.pop();
        // End case -- result has been found, return the traced path.
        if (currentNode.x == end.x && currentNode.y == end.y) {
            var curr = currentNode;
            var ret = [];
            while (curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }
        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;
        // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
        var neighbors = neighbours(grid, currentNode);

        for (var i = 0, il = neighbors.length; i < il; i++) {
            var neighbor = neighbors[i];

            if (neighbor.closed || neighbor.isWall) {
                // Not a valid node to process, skip to next neighbor.
                continue;
            }
            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = currentNode.g + neighbor.cost;
            var beenVisited = neighbor.visited;

            if (!beenVisited || gScore < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || manhattan(neighbor, end);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                }
                else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }

    // No result was found - empty array signifies failure to find path.
    return [];
}

var manhattan = function (node0, node1) {
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    var d1 = Math.abs(node0.x - node1.x);
    var d2 = Math.abs(node0.y - node1.y);
    return d1 + d2;
}

function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function () {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function (node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    },
    size: function () {
        return this.content.length;
    },
    rescoreElement: function (node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function (n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1,
                parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }

            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function (n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};
