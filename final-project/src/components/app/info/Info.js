import './Info.css';

function Info(props) {
	function determineMove(type) {
		return props.currentPuzzle["FEN"].split(" ")[1] == "w" ? (type == "piece" ? "k" : "Black") : (type == "piece" ? "wk" : "White");
	}

	function determineColor() {
		let dist = props.currentPuzzle["Rating"] - props.myRating;
		if (dist <= 200) { return "green"; }
		if (dist <= 400) { return "yellow"; }
		return "red";
	}

	return (
		<div class = "info">
			<p>Puzzle rating: <span class = {determineColor()}>{props.currentPuzzle["Rating"]} ± {props.currentPuzzle["RatingDeviation"]}</span>
			</p>
			<p>View this puzzle: {window.location.href.split("?")[0]}?puzzle={props.id}</p>
			<p>My rating: <span class = "rating">{props.myRating}</span></p>
			{!props.found && window.location.href == window.location.href.split("?")[0] ? <p style = {{color: "red"}}>No puzzles with current preferences, choosing a random one</p> : <></>}
			<br/>
		<div class = "subpanel">
			<img class = "piece" src = {process.env.PUBLIC_URL + '/' + determineMove("piece") + ".svg"}/> 
			<p>Find the correct move for <span class = "subpanel-data"><b>{determineMove("side")}</b></span></p>
		</div>
		</div>
	);
}

export default Info;