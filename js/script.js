// window.addEventListener("load", function handler(){
	'use strict';

	var newGameBtn = document.querySelector('.new-game');
	var field = document.querySelector('.field');
	var cells;
	var message = document.querySelector('.message');
	var move;
	var movesArr = [[],[],[]];

	newGameBtn.addEventListener("click", function(){
		var i;
		move = 'x';
		movesArr = [[],[],[]];
		cells = document.querySelectorAll('.cell');
		message.innerHTML = 'X turn';
		message.classList.remove('winx');
		message.classList.remove('wino');
		for (i = 0; i < cells.length; i++){
			cells[i].classList.remove('x');
			cells[i].classList.remove('o');
		}
		field.addEventListener('click', handleClick);
	});

	function handleClick(e){
		// console.log(e.target);
		if (e.target.classList.contains('cell')){
			if (!e.target.classList.contains('x') && !e.target.classList.contains('o')){
				if (move === 'x'){
					e.target.classList.add('x');
					movesArr[e.target.getAttribute('data-row')][e.target.getAttribute('data-col')] = 'x';
					move = 'o';
					message.innerHTML = 'O turn';
				} else {
					e.target.classList.add('o');
					movesArr[e.target.getAttribute('data-row')][e.target.getAttribute('data-col')] = 'o';
					move = 'x';
					message.innerHTML = 'X turn';
				}
				e.stopPropagation();
				if (getWinner()){
					console.log(getWinner());
					if (getWinner() === 'x') {
						message.innerHTML = 'Congrats! X is the winner';
						message.classList.add('winx');
					} else if (getWinner() === 'o') {
						message.innerHTML = 'Congrats! O is the winner';
						message.classList.add('wino');
					} else if (getWinner() === 'standoff') {
						message.innerHTML = 'Standoff. Try again.';
					}
					field.removeEventListener('click', handleClick);
					movesArr = [[],[],[]];
				}
			}
		}
	}

	function getWinner() {
	    if (
	        ((movesArr[0][0] === movesArr[1][1]) && (movesArr[1][1] === movesArr[2][2])) ||
	        ((movesArr[2][0] === movesArr[1][1]) && (movesArr[1][1] === movesArr[0][2]))
	    ) {
	        return movesArr[1][1];
	    }
	    var count = 0;
	    for (var a = 0; a < 3; a++){
	    	for (var b = 0; b < 3; b++){
	    		if (movesArr[a][b] != undefined){
	    			count++;
	    		}
	    	}
	    }
	    if (count === 9){
	    	return 'standoff';
	    }

	    for (var i = 0 ; i < 3; i++) {
	        if ((movesArr[0][i] === movesArr[1][i]) && (movesArr[1][i] === movesArr[2][i])) {
	            if (movesArr[0][i]) return movesArr[0][i];
	        }
	        if ((movesArr[i][0] === movesArr[i][1]) && (movesArr[i][1] === movesArr[i][2])) {
	            if (movesArr[i][0]) return movesArr[i][0];
	        }
	    }
	}


// });