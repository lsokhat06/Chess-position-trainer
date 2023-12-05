import './Proceed.css';
import InfoContext from '../../../context/info.context';
import { useContext } from 'react';

function Proceed(props) {
	let infoContext = useContext(InfoContext);
	function process() {
		if (props.finished == true) { infoContext.setPuzzle(); }
	}
	return (
		<div class = {"proceed " + (props.finished ? "active" : "inactive")} onClick = {process}>
			<p>Continue training...</p>
		</div>
	);
}

export default Proceed;