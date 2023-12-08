import './Proceed.css';
import InfoContext from '../../../context/info.context';
import { useContext } from 'react';

function Proceed(props) {
	let infoContext = useContext(InfoContext);
	function process() {
		if (props.finished == true) { infoContext.setPuzzle(); }

		let clear_url = window.location.href.split("?")[0];
		if (window.location.href != clear_url) { window.location.href = clear_url; }
	}
	return (
		<div class = {"proceed " + (props.finished ? "active" : "inactive")} onClick = {process}>
			<p>Continue training...</p>
		</div>
	);
}

export default Proceed;