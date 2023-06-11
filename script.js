let boardArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
                ];
//const grid = document.querySelector("#grid");
//grid.addEventListener("click", induceCompTurn);
const gridTiles = document.querySelectorAll(".grid-section");
gridTiles.forEach(el => el.addEventListener("click", addCharacter, {once:true}));
const playerScore = document.querySelector("#player");
const compScore = document.querySelector("#computer");


function induceCompTurn() {
    setTimeout(()=>{}, 5000);
    compTurn(determinePlayableSpaces(boardArr));
}

function addCharacter(el) {
    el.preventDefault();
    if (el) { //el.target.childNodes.length === 1
        const character = document.createElement("p");
        character.textContent = "X";
        el.target.appendChild(character);

        editBoardArr(el.target.id, "X")
        console.log(hasWon(boardArr, "X"));
        if (hasWon(boardArr, "X")) {
            gridTiles.forEach(el => el.removeEventListener("click", addCharacter));
            alert("You have won!");
            updateScore("X");
            resetBoard();

        } else {
            induceCompTurn();
        }
    }
}


function editBoardArr(id, player) {
    switch (id) {
        case "tl":
            boardArr[0][0] = player;
            break;
        case "tm":
            boardArr[0][1] = player;
            break;
        case "tr":
            boardArr[0][2] = player;
            break;
        case "ml":
            boardArr[1][0] = player;
            break;
        case "mm":
            boardArr[1][1] = player;
            break;
        case "mr":
            boardArr[1][2] = player;
            break;
        case "bl":
            boardArr[2][0] = player;
            break;
        case "bm":
            boardArr[2][1] = player;
            break;
        case "br":
            boardArr[2][2] = player;
            break;
    }
}


function hasWon(arr, player) { //Takes board array as a parameter., player is either "X" or "O" depending on if we are checking for a comp or player win.
    const winningArr = JSON.stringify([player, player, player]);
    console.log("winningArr", winningArr)
    console.log("boardArr", boardArr)
    for (let i=0; i<3; i++){
        if (winningArr == JSON.stringify(boardArr[i])) {
            return true
        }//horizontal 

        if (winningArr == JSON.stringify([boardArr[0][i], boardArr[1][i], boardArr[2][i]])) {
            return true
        }//vertical
    }

    if (JSON.stringify([boardArr[0][0], boardArr[1][1], boardArr[2][2]]) == winningArr) {
        return true
    }
    if (JSON.stringify([boardArr[2][0], boardArr[1][1], boardArr[0][2]]) == winningArr) {
        return true
    }

    return false
}

function determinePlayableSpaces(arr) {
    const playableSpaces = []; //array of numbers corresponding to empty
    let count = 1;
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (arr[i][j] == "") {
                playableSpaces.push(count);
            }
            count++
        }
    }
    return playableSpaces
}








function compTurn(arr) { //always pass in determinePlayableSpaces(boardArr)
    const numGridChoice = arr[Math.floor(Math.random() * arr.length)];
    let idChoice;
    switch (numGridChoice) {
        case 1:
            idChoice = "tl";
            break
        case 2:
            idChoice = "tm";
            break
        case 3:
            idChoice = "tr";
            break
        case 4:
            idChoice = "ml";
            break
        case 5:
            idChoice = "mm";
            break
        case 6:
            idChoice = "mr";
            break
        case 7:
            idChoice = "bl";
            break
        case 8:
            idChoice = "bm";
            break
        case 9:
            idChoice = "br";
            break
    }
    console.log(idChoice)

    const tile = document.querySelector(`#${idChoice}`);
    console.log(tile);
    const newElement = document.createElement("p");
    newElement.textContent = "O"
    tile.appendChild(newElement);
    tile.removeEventListener("click", addCharacter)

    editBoardArr(idChoice, "O");
    if (hasWon(boardArr, "O")) {
        gridTiles.forEach(el => el.removeEventListener("click", addCharacter));
        alert("Computer has won!")
    }
}


function resetBoard() {
    boardArr = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
                    ];
    gridTiles.forEach(el => el.addEventListener("click", addCharacter, {once:true}));
    gridTiles.forEach(el => el.innerHTML = "");
}

function updateScore(player) {
    if (player === "X") {
        let score = Number(playerScore.textContent);
        score ++
        playerScore.textContent = score;
    }

    if (player === "O") {
        let score = Number(compScore.textContent)
        score ++
        compScore.textContent = score;
    }
}