//create array to hold board data
let boardData=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//Defind game veriable
let player = 1;
let gameOver = false;

//pull element by DOM
let cellElement = document.querySelectorAll(".cell");
let res = document.getElementById("result");

cellElement.forEach((cell,index)=>{
    cell.addEventListener("click" ,()=>{    // It is used to interact to user, here we use click(or we can use "mousedown"/"on cick"etc) and then call a function.
        plceMarker(index);
    });
});

function plceMarker(index){
    let col = index % 3; 
    let row = (index - col)/3;
    //check if the cell is empty
    if(boardData[row][col]==0 && gameOver == false){
        boardData[row][col]=player;
        //chande player
        player*=-1;
        drawMarkers();
        chechResult();
    }
}

function drawMarkers(){
    for(let row = 0 ;row < 3;row++){
        for(let col = 0;col < 3;col++){
            if(boardData[row][col] == 1){
                cellElement[(row*3)+col].classList.add("cross");
            }else if(boardData[row][col] == -1){
                cellElement[(row*3)+col].classList.add("circle");
            }
        }
    }
}

function chechResult(){
    //check for row and column wise winner 
    for(let i = 0;i<3;i++){
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3){
            endGame(1);
            return;
        }else if(rowSum == -3 || colSum == -3){
            endGame(2);
            return;
        }
    }
    
    //check diagonal wise winner 
    let dieSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let dieSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if(dieSum1 == 3 || dieSum2 == 3){
        endGame(1);
        return;
    }else if(dieSum1 == -3 ||dieSum2 == -3){
        endGame(2);
        return;
    }

    //for tie condition
    if(boardData[0].indexOf(0)==-1 && boardData[1].indexOf(0)==-1 && boardData[2].indexOf(0)==-1){
        endGame(0);
        return;
    }
}

function endGame(winner){
    // here we trigger
    gameOver = true;

    //check if the game is tie
    if(winner == 0){
        res.innerText = "It's a tie match ";
    }else{
        res.innerText = `Player ${winner} is winner !!!`;
    }
}

let rst = document.getElementById("restart");

rst.addEventListener("click",()=>{
    //Reset game variable
    boardData=[
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    player = 1;
    gameOver = false;

    //Reset board
    cellElement.forEach(cell =>{
        cell.classList.remove("cross","circle");
    })

    //To remove tie or winner nane
    res.innerText = "";
});