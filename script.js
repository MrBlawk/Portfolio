/* Constants */

/* app's state*/

let board;

/* cached element references */

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
        console.log(mark, index);
        });


 };

 