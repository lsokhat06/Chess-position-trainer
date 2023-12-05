import './Move.css';
import InfoContext from '../../../context/info.context';
import { useContext } from 'react';

function Move() {
	let infoContext = useContext(InfoContext);
	function showMove() {
		let moves = JSON.parse(localStorage.getItem("moves"));
		if (moves.length != 0) {
			document.getElementById(moves[0].substring(0, 2)).style.border = "3px solid blue";
			document.getElementById(moves[0].substring(2, 4)).style.border = "3px solid blue";
		}
		infoContext.setMoveHintUsed(true);
	}
	return (
		<div class = "wrappermove" onClick = {showMove}>
			<img class = "defaultmove" src = {process.env.PUBLIC_URL + "check.png"}/>
			<p><b>Move</b></p>
		</div>
	);
}

export default Move;