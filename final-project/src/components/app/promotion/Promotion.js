import './Promotion.css';
import InfoContext from '../../../context/info.context';
import { useContext } from 'react';

function Promotion(props) {
	let infoContext = useContext(InfoContext);
	if (props.isPromoting) {
		return (
			<div class = "promotion">
				<p>Please specify the piece of promotion<br/>(Q = Queen, N = Knight, B = Bishop, R = Rook)</p>
				<br/>
				<input type="text" id="pieceName" onChange = {infoContext.setPromotionPiece}/>
				<br/>
				<br/>
				{infoContext.moveHintUsed ? <p>The correct promotion is {infoContext.correctPromotion}</p> : <></>}
			</div>
		);
	}
	return (<></>);
}

export default Promotion;