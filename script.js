/* Constants */

const winningCombos = [

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],

];

/* app's state*/

let board;

let turn = 'X';

let win;

win = board[0] && board[0] === board[1] && board[0] === board[2] ? board[0] : null;

/* cached element references */
const squares = Array.from(document.querySelectorAll('#board div'));

const messages = document.querySelector('h2');

/* event listeners */
document.getElementById('board').addEventListener('click', handleTurn);


/* functions */ 
function getWinner()
{
    //just stub it up
    let winner = null;

    winningCombos.forEach(function(combo,index){

        if(board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]])
        winner = board[combo[0]]
    });

    return winner;
    
};


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

win = getWinner();


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
        //console.log(mark, index);
        console.log(winner)
        

        });

        messages.textContent = win ? `${win} 'wins the game!'` : `It's ${turn} 's turn!`;

 };

 