const x_cls='x';
const o_cls='o';
let oturn;
var pla_x;
var pla_y;

const win_combi=[

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellelement = document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const win_message=document.getElementById('win-message');
const win_text=document.querySelector('[win-text]');
const restart=document.getElementById('restart');
const input_panel=document.getElementById('input')
gameStart();
function playerinput() {
    pla_x=document.getElementById('x').value;
    pla_y=document.getElementById('y').value;
    input_panel.classList.remove('show');
}
function gameStart() {
    setHover();
    cellelement.forEach(cell => {
        cell.classList.remove(x_cls);
        cell.classList.remove(o_cls);
        input_panel.classList.add('show');
        document.getElementById('x').value='';
        document.getElementById('y').value='';
        cell.removeEventListener('click',handleclick);
    cell.addEventListener('click',handleclick,{once:true});
    win_message.classList.remove('show');
});
}

restart.addEventListener('click',gameStart);


function handleclick(e){
  const cell= e.target;
  const currentState= oturn? o_cls: x_cls;
  mark(cell,currentState);
  if (win_test(currentState)) {
    end_game(false);
  }else if(isDraw()){
      end_game(true);
  }
 else{
    swapTurn();
    setHover();
 }
}

function isDraw() {
    return [...cellelement].every(cell=>{
        return cell.classList.contains(x_cls) || cell.classList.contains(o_cls)
    })
}

function end_game(draw) {
    win_message.classList.add('show');
    if(draw){
        win_text.innerText = `Draw!`

    }else{
        win_text.innerText = `${oturn? pla_y:pla_x} Wins!!`    
    }
    
}


function mark(cell, currentState){
   cell.classList.add(currentState);

}

function swapTurn() {
    oturn=!oturn;
}

function setHover() {
    board.classList.remove(x_cls);
    board.classList.remove(o_cls);
    if(oturn){
        board.classList.add(o_cls);
    }else{
        board.classList.add(x_cls);
    }
}

function win_test(currentState) {
    return win_combi.some(combination=>{
        return combination.every(index =>{
            return cellelement[index].classList.contains(currentState)
        })
    })
}