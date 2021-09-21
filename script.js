/* Constants */

/* app's state*/

let board;

let turn = 'X';

/* cached element references */
const squares = Array.from(document.querySelectorAll('#board div'));

/* event listeners */
document.getElementById('board').addEventListener('click', handleTurn);


/* functions */ 
function handleTurn(event)
{
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });

board[idx] = turn;

if (turn === 'X'){
    turn = 'O'
} 
else {
    turn = 'X'
};

render();
//console.log(board);
};

function init(){
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

render();

};

init();

 function render(){
        board.forEach(function(mark, index){
        squares[index].textContent = mark;
        console.log(mark, index);
    });
};

 