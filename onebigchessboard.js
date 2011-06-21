(function () {

var world;
var gridCells = [];
var rows = {};
var isPanning = false;
var panX = 0, panY = 0;
var scrollX = 0, scrollY = 0;

function startPanning (x, y) {
	panX = x;
	panY = y;
	isPanning = true;
}

function handlePanning(x, y) {
	var dx = panX - x;
	var dy = panY - y;
	panX = x;
	panY = y;
	
	scrollX -= dx;
	scrollY -= dy;
	
	world.offset({left: scrollX, top: scrollY});
}

function endPanning() {
	isPanning = false;
}

function getCell(x, y) {

}

function putCell(x, y, cell) {
	
}

function getRowEl(row) {
	if (!rows.hasOwnProperty(row)) {
		rows[row] = document.createElement('div');
		$(rows[row]).addClass('row');
		board.append(rows[row]);
	}
	
	return rows[row];
}

function renderWorld() {
	var board = createBoard();
	
	world.append(board);
}

function createBoard() {
	var board = $('<div class="board"></div>');
	var col, row, cell;
	var currentRow;
	var color;
	
	for (row=0; row < 8; row++) {
		currentRow = $('<div class="row"></div>');
		
		for (col=0; col < 8; col++) {
			color = (col + row) % 2;
			cell = $('<div class="cell"></div>');
			
			if (color) {
				cell.addClass('white');
			} else {
				cell.addClass('black');
			}
			
			currentRow.append(cell);
		}
		
		board.append(currentRow);
	}
	
	return board;
}

$(document).ready(function () {
	world = $('#world');
	renderWorld();
	
	$(document).bind('contextmenu', function (e) {
		e.preventDefault();
	});
	
	$(document).bind('mousedown', function (e) {
		switch (e.button) {
		case 2:
			startPanning(e.clientX, e.clientY);
			break;
		}
	});
	
	$(document).bind('mousemove', function (e) {
		if (isPanning) {
			handlePanning(e.clientX, e.clientY);
		}
	});
	
	$(document).bind('mouseup', function (e) {
		switch (e.button) {
		case 2:
			endPanning();
			break;
		}
	});
	
	$(window).bind('resize', function (e) {
		//layoutBoard();
	});
});
}());