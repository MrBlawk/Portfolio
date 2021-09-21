/* Constants */

/* app's state*/

let board;

/* cached element references */
const squares = Array.from(document.querySelectorAll('#board div'));

/* event listeners */

/* functions */ 

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

 