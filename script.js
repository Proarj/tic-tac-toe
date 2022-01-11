const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
const WIN_COMBO = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winMsgTxt = document.querySelector('[data-win-msg-txt]');
const winMsg = document.querySelector('.win-msg');
const resButton = document.querySelector('#restart');
let circleTurn;


start()
resButton.addEventListener('click', start);

function start(){
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener("click",handleClick,{once:true})
    })
    boardHover()
    winMsg.classList.remove('show');
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn? CIRCLE_CLASS:X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        end(false);
    }
    else if(checkDraw()) {
        end(true);
    }
    else{
        swapTurns();
        boardHover()
    }
}

function end(draw){
    if (draw){
        winMsgTxt.innerText = "Draw!";
    }
    else{
        winMsgTxt.innerText = `${circleTurn? "O":"X"} Wins`;
    }
    winMsg.classList.add("show");

}

function checkDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function checkWin(currentClass){
    return WIN_COMBO.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function boardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn)
        board.classList.add(CIRCLE_CLASS);
    else
        board.classList.add(X_CLASS);
}