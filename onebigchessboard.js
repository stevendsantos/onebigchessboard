(function () {

var world;
var boards = {};
var rows = {};
var isPanning = false;
var panX = 0, panY = 0;
var scrollX = 0, scrollY = 0;

function createPiece(col, row, type, color) {
	var piece = $('<div class="piece"></div>');
	
	piece.addClass(type);
	piece.addClass(color);
	
	var cell = getCell(col, row);
	cell.append(piece);
	
	return piece;
}

function createPlayer(kingCol, kingRow, color) {
	createPiece(kingCol-4, kingRow, 'rook', 'black');
	createPiece(kingCol-3, kingRow, 'knight', 'black');
	createPiece(kingCol-2, kingRow, 'bishop', 'black');
	createPiece(kingCol-1, kingRow, 'queen', 'black');
	createPiece(kingCol, kingRow, 'king', 'black');
	createPiece(kingCol+1, kingRow, 'bishop', 'black');
	createPiece(kingCol+2, kingRow, 'knight', 'black');
	createPiece(kingCol+3, kingRow, 'rook', 'black');
	
	var pawnCol;
	
	for (pawnCol = -4; pawnCol < 4; pawnCol++) {
		createPiece(kingCol + pawnCol, kingRow-1, 'pawn', 'black');
	}
}

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
	var boardX = Math.floor(x / 8).toFixed();
	var boardY = Math.floor(y / 8).toFixed();
	var board = getBoard(boardX, boardY);
	console.log(boardX, boardY);
	
	x -= boardX * 8;
	y -= boardY * 8;
	console.log(x, y);
	return board[x + (y * 8)];
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
	var board, x, y;
	
	for (y=-2; y < 2; y++) {
	for (x=-2; x < 2; x++) {
		board = getBoard(x, y);
	}
	}

	createPlayer(0, 0);
	
	
}

function keyPos(x, y) {
	x = Math.floor(x).toFixed();
	y = Math.floor(y).toFixed();
	
	if (!x) {
		x = 0;
	}
	
	if (!y) {
		y = 0;
	}
	
	var key = [x,y].join(',');
	
	console.log(key);
	
	return key;
}

function getBoard(x, y) {
	var boardKey = keyPos(x, y);
	
	if (boards.hasOwnProperty(boardKey)) {
		return boards[boardKey];
	}
	
	var cells = [];
	var board = $('<div class="board"></div>');
	var col, row, cell;
	var currentRow;
	var color;
	
	board.offset({
		left: x * 8 * 48,
		top: y * 8 * 48
	});
	
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
			cells.push(cell);
		}
		
		board.append(currentRow);
	}
	
	boards[boardKey] = cells;
	world.append(board);
	return cells;
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