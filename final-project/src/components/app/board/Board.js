import './Board.css';
import { useState, useEffect, useContext } from "react";
import { Chess } from "chess.js";
import InfoContext from '../../../context/info.context';

let perspective = "";
let movesLeft = [];
let currentFEN = "";
let selectedPiece = "";

function Board(props) {

  let [isCorrect, setIsCorrect] = useState(2);
  let [promotionCoords, setPromotionCoords] = useState([]);
  let infoContext = useContext(InfoContext);

  function returnCorrectness() {
    if (isCorrect == 0) { return " incorrect"; }
    if (isCorrect == 1) { return " correct"; }
    return "";
  }

  function getAllPossibleMoves(FEN) {
    let chess = new Chess();
    chess.load(FEN);
    return chess.moves({"verbose": true});
  }

  function getPosition(FEN) {
    let figures = "rnbqkbnrRNBQKBNRpP";
    let components = FEN.split(' ');
    let lines = components[0].split('/');
    let parsedPosition = [];
    let parsedDict = {};
    for (let i = 0; i < 8; ++i) {
      let temp = "";
      for (let j = 0; j < lines[i].length; ++j) {
        if (figures.includes(lines[i][j])) { temp += lines[i][j]; }
        else { 
          let repetitions = parseInt(lines[i][j]);
          for (let k = 0; k < repetitions; ++k) { temp += "."; }
        }
      }
      parsedPosition.push(temp);
    }
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        parsedDict[String.fromCharCode(97 + j) + String.fromCharCode(56 - i)] = parsedPosition[i][j]; // ('a' + j) (letter), ('8' - i) (number)
      }
    }
    return [components, parsedDict];
  }

  function generateBoard() {
    let squares = {};
    for (let i = 1; i <= 8; ++i) {
      for (let j = 1; j <= 8; ++j) {

        let period = (j % 2 != 0);
        let bgcolor = (i % 2 == 0 ? (period ? "light" : "dark") : (period ? "dark" : "light"));

        let letterData = String.fromCharCode(97 + j - 1); // 'a' + j - 1
        let numberData = String.fromCharCode(57 - i); // '9' - i

        let id = letterData + numberData;

        let square = {"id": id, "color": bgcolor, "piece": "", "selected": false};

        if (i == 8) { square["letter"] = letterData; } // if last row -> assign a letter
        if (j == 8) { square["number"] = numberData; } // if last column -> assign a number

        squares[id] = square;
      }
    }
    return squares;
  }

  let [board, setBoard] = useState(generateBoard());

  function transformToHTML(json) {
    let squares = [];
    for (const [key, value] of Object.entries(json)) {
      squares.push(
        <div key = {value["id"]} class = {"square " + value["color"] + " " + (value["selected"] ? "selected" : "")} id = {value["id"]} onClick = {() => handleClick(value["id"])}>
        {"letter" in value ? <p class = "squareLetter"><b>{value["letter"]}</b></p> : <></>}
        {"number" in value ? <p class = "squareNumber"><b>{value["number"]}</b></p> : <></>}
        {value["piece"] == "" ? <></> : <img src = {process.env.PUBLIC_URL + '/' + value["piece"] + ".svg" }></img>}

        </div>
      );
    }
    return squares;
  }

  function changePerspective() {
    /*

    To change the perspective of the board (white -> black or black -> white), we need to change 
    the value of ID of a square (letter, number) to the "opposite value";
    For example: A -> H, B -> G...; 1 -> 8, 2 -> 7...

    The general formula is: (endIndex - (letter - startIndex))
    For letters: ('h' - (letter - 'a')), or (104 - (letter - 97))
    For numbers: ('9' - (number - '0'), or (57 - (number - 48))

    The letterData and numberData properties also need to be changed to display board coordinates properly.

    */

    let newBoard = {};
    let temp = {...board};
    for (const [key, value] of Object.entries(temp)) {
      let id = value["id"];
      id = String.fromCharCode(104 - (id.charCodeAt(0) - 97)) + String.fromCharCode(57 - (id.charCodeAt(1) - 48));
      newBoard[id] = {"id": id, "color": value["color"], "piece": value["piece"], "selected": value["selected"]};
      if (value["letter"]) { newBoard[id]["letter"] = id[0]; }
      if (value["number"]) { newBoard[id]["number"] = id[1]; }
    }
    setBoard(newBoard);
    return newBoard;
  }

  function setPosition(FEN, withChange) {;
    let [components, parsedDict] = getPosition(FEN);
    let temp = {...board};
    if (withChange) { temp = changePerspective(temp); }
    for (let key in temp) {
      let square = parsedDict[key];
      /*
      If square isn't empty -> (content is black ? append without changes : "w" + content)
      else: set empty square
      */
      if (square != '.') {
        if (square == square.toLowerCase()) {
          temp[key]["piece"] = square;
        }
        else {
          temp[key]["piece"] = "w" + square;
        }
      }
      else {
        temp[key]["piece"] = "";
      }
    }
    setBoard(temp);
  }

  function responseMove() {

    let chess = new Chess();
    chess.load(currentFEN);
    let moves = [...movesLeft];
    chess.move(moves[0]);
    moves.shift();

    let newFEN = chess.fen();


    setPosition(newFEN, false);

    movesLeft = moves;
    localStorage.setItem("moves", JSON.stringify(movesLeft));
    currentFEN = newFEN;

  }

  function move(start, end) {

    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        document.getElementById(String.fromCharCode(97 + i) + String.fromCharCode(49 + j)).style.border = "none";
      }
    }


    let legalMoves = getAllPossibleMoves(currentFEN);
    let standardFormat = [];
    for (let i = 0; i < legalMoves.length; ++i) {
      standardFormat.push(legalMoves[i]["from"] + legalMoves[i]["to"]);
    }
    if (standardFormat.indexOf(start + end) != -1) {


      if ((end[1] == "8" && board[start]["piece"] == "wP") || (end[1] == "1" && board[start]["piece"] == "p")) {
        infoContext.setPromoting(true);
        setPromotionCoords([start, end]);
        infoContext.setCorrectPromotion(movesLeft[0]);
      }

      else {

      let chess = new Chess();
      chess.load(currentFEN);
      chess.move(start + end);
      let newFEN = chess.fen();
      currentFEN = newFEN;
      setPosition(newFEN, false);

      if (start + end == movesLeft[0]) {
        setIsCorrect(1);

        let movesLen = movesLeft.length;

        if (movesLen > 0) { movesLeft.shift(); movesLen--; }
        if (movesLen > 0) { responseMove(); movesLen--; } 
        if (movesLen == 0) {
          movesLeft.shift();
          localStorage.setItem("moves", JSON.stringify(movesLeft));
          infoContext.update(true);
        }

      }


      else {
        setIsCorrect(0);
        infoContext.update(false);
      }

      }



    }
    infoContext.setMoveHintUsed(false);
  }

  function handleClick(id) {
    let temp = {...board};
    let currentPiece = temp[id]["piece"];
    let isWhite = currentPiece.includes("w");
    let validSelection = (!isWhite && perspective == "b") || (isWhite && perspective == "w");

    if (selectedPiece != "") {
      move(selectedPiece, id);
      selectedPiece = "";
      for (let [key, value] of Object.entries(temp)) { 
        temp[key]["selected"] = false; 
      }
    }
    else if (selectedPiece == "" && currentPiece != "" && validSelection)  {
      selectedPiece = id;
      temp[id]["selected"] = !temp[id]["selected"];
    }
    setBoard(temp);
  }

  function processPuzzle(puzzle) {
    let temp = {...board};
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        temp[String.fromCharCode(97 + i) + String.fromCharCode(49 + j)]["selected"] = false;
      }
    }
    setBoard(temp);
    /*
    We need to make the first move and remove it from the list, as our system slightly differs
    from the one that Lichess uses
    */
    let chess = new Chess();
    chess.load(puzzle["FEN"]);

    let moves = puzzle["Moves"].split(" ");
    chess.move(moves[0]);
    moves.shift();



    let newFEN = chess.fen();
    let currentPerspective = getPosition(newFEN)[0][1]; // second element in first component stands for perspective: "w" or "b"

    if ((perspective == "" && currentPerspective == "b") || (perspective != "" && currentPerspective != perspective)) {
      setPosition(newFEN, true);
    }
    else {
      setPosition(newFEN, false);
    }

    movesLeft = moves;
    localStorage.setItem("moves", JSON.stringify(movesLeft));
    perspective = currentPerspective;
    currentFEN = newFEN;
  }

  function promotePawn() {

    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        document.getElementById(String.fromCharCode(97 + i) + String.fromCharCode(49 + j)).style.border = "none";
      }
    }

    if (props.pieceOfPromotion != "") {

    let chess = new Chess();
    chess.load(currentFEN);
    chess.move(promotionCoords[0] + promotionCoords[1] + props.pieceOfPromotion);
    let newFEN = chess.fen();
    currentFEN = newFEN;
    setPosition(newFEN, false);

    if (promotionCoords[0] + promotionCoords[1] + props.pieceOfPromotion == movesLeft[0]) {
        setIsCorrect(1);
        let movesLen = movesLeft.length;
        if (movesLen > 0) { movesLeft.shift(); movesLen--; }
        if (movesLen > 0) { responseMove(); movesLen--; } 
        if (movesLen == 0) {
          movesLeft.shift();
          localStorage.setItem("moves", JSON.stringify(movesLeft));
          infoContext.update(true);
        }

    }
    else {
      setIsCorrect(0);
      infoContext.update(false);
    }
    }

    infoContext.setPromoting(false);
    infoContext.setPieceOfPromotion("");

    infoContext.setCorrectPromotion("");
    infoContext.setMoveHintUsed(false);
    setPromotionCoords([]);

  }

  useEffect(() => {
    setIsCorrect(2);
    movesLeft = [];
    localStorage.setItem("moves", JSON.stringify([]));
    currentFEN = "";
    selectedPiece = "";
    processPuzzle(props.currentPuzzle);
    infoContext.setPromoting(false);
    infoContext.setPieceOfPromotion("");
    infoContext.setCorrectPromotion("");
    infoContext.setMoveHintUsed(false);
    setPromotionCoords([]);
  }, [props.currentPuzzle]);

  useEffect(() => {
    promotePawn();
  }, [props.pieceOfPromotion]);



  return (
    <div class={"Board" + returnCorrectness()}>
    {transformToHTML(board)}
    </div>
  );
}

export default Board;
