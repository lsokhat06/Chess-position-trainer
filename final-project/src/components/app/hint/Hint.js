import './Hint.css';

function Hint() {
	function showHint() {
		let moves = JSON.parse(localStorage.getItem("moves"));
		if (moves.length != 0) {
			document.getElementById(moves[0].substring(0, 2)).style.border = "3px solid blue";
		}
	}
	return (
		<div class = "wrapperhint" onClick = {showHint}>
			<img class = "defaulthint" src = {process.env.PUBLIC_URL + "lightbulb.png"}/>
			<p><b>Hint</b></p>
		</div>
	);
}

export default Hint;