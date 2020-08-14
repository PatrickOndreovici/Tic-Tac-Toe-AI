var board = [["", "", ""],
             ["", "", ""],
             ["", "", ""]];
var player = "X", AI = "O", contor = 0, finishedGame = false;
function GetWinner(board){
    for (var i = 0; i < 3; ++i){
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]){
            if (board[i][0] == player){
                return 1;
            }
            if (board[i][0] == AI){
                return -1;
            }
        }
    }
    for (var i = 0; i < 3; ++i){
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]){
            if (board[0][i] == player){
                return 1;
            }
            if (board[0][i] == AI){
                return -1;
            }
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        if (board[0][0] == player){
            return 1;
        }
        if (board[0][0] == AI){
            return -1;
        }
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]){
        if (board[0][2] == player){
            return 1;
        }
        if (board[0][2] == AI){
            return -1;
        }
    }
    return 0;
}
function minimax(board, computer, moves){
    var winner = GetWinner(board);
    if (winner != 0){
        return winner;
    }
    if (moves == 9){
        return 0;
    }
    if (computer){
        var bestScore = Infinity;
        for (var i = 0; i < 3; ++i){
            for (var j = 0; j < 3; ++j){
                if (board[i][j] == ""){
                    board[i][j] = AI;
                    var score = minimax(board, false, moves + 1);
                    if (score < bestScore){
                        bestScore = score;
                    }
                    board[i][j] = "";
                }
            }
        }
        return bestScore;
    }
    else{
        var bestScore = -Infinity;
        for (var i = 0; i < 3; ++i){
            for (var j = 0; j < 3; ++j){
                if (board[i][j] == ""){
                    board[i][j] = player;
                    var score = minimax(board, true, moves + 1);
                    if (score > bestScore){
                        bestScore = score;
                    }
                    board[i][j] = "";
                }
            }
        }
        return bestScore;
    }
}
function reset(){
    for (var i = 0; i < 3; ++i){
        for (var j = 0; j < 3; ++j){
            board[i][j] = "";
            $("#" + (3 * i + j)).html("");
        }
    }
    contor = 0;
}
function GetBestPos(board){
    var bestScore = Infinity, pos = [];
    for (var i = 0; i < 3; ++i){
        for (var j = 0; j < 3; ++j){
            if (board[i][j] == ""){
                board[i][j] = AI;
                var score = minimax(board, false, contor + 1);
                if (score < bestScore){
                    bestScore = score;
                    pos = [];
                }
                if (score == bestScore){
                    pos.push(3 * i + j);
                }
                board[i][j] = "";
            }
        }
    }
    return pos;
}
$("td").click(function (){
    if (finishedGame == true) return;
    var pos = $(this).attr("id");
    var x = Math.floor(pos / 3);
    var y = pos % 3;
    if (board[x][y] != "") return;
    $("#" + pos).html('<img src="X.png" alt="">');
    board[x][y] = player;
    ++contor;
    console.log(board);
    var winner = GetWinner(board);
    console.log(winner);
    if (winner == 1 || contor == 9){
        finishedGame = true;
        if (winner == 1){
            $("h3").html("Ai câștigat");
        }
        else{
            $("h3").html("Egalitate");
        }
        setTimeout(() => {
            reset();
            $("h3").html("");
            finishedGame = false;
        }, 3000);
        return;
    }
    var pos2 = GetBestPos(board);
    pos2 = pos2[Math.floor(Math.random() * pos2.length)];
    var x2 = Math.floor(pos2 / 3);
    var y2 = pos2 % 3;
    $("#" + pos2).html('<img src="NANE.jpg" alt="">');
    board[x2][y2] = AI;
    ++contor;
    winner = GetWinner(board);
    if (winner == -1 || contor == 9){
        finishedGame = true;
        if (winner == -1){
            $("h3").html("Nane a castigat");
        }
        else{
            $("h3").html("Egalitate");
        }
        setTimeout(() => {
            reset();
            $("h3").html("");
            finishedGame = false;
        }, 3000);
        return;
    }
});
