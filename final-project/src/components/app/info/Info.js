import './Info.css';

function Info(props) {
	function determineMove(type) {
		return props.currentPuzzle["FEN"].split(" ")[1] == "w" ? (type == "piece" ? "k" : "Black") : (type == "piece" ? "wk" : "White");
	}

	function determineColor() {
		if (props.currentPuzzle["Rating"] <= 2000) { return "green"; }
		if (props.currentPuzzle["Rating"] > 2000 && props.currentPuzzle["Rating"] <= 2200) { return "yellow"; }
		return "red";
	}

	return (
		<div class = "info">
			<p>Puzzle rating: <span class = {determineColor()}>{props.currentPuzzle["Rating"]}</span>
				<br/>
				Game: {props.currentPuzzle["GameUrl"]}
			</p>
			<p>My rating: <span class = "rating">{props.myRating}</span></p>
			<br/>
		<div class = "subpanel">
			<img class = "piece" src = {process.env.PUBLIC_URL + '/' + determineMove("piece") + ".svg"}/> 
			<p>Find the correct move for <span class = "subpanel-data"><b>{determineMove("side")}</b></span></p>
		</div>
		</div>
	);
}

export default Info;