import './Menu.css';
import InfoContext from '../../../context/info.context';
import { useContext } from "react";

function Menu(props) {
	let infoContext = useContext(InfoContext);
	return (
		<div class = "menu">
		<div class = "menu_item" onClick = {() => infoContext.setMenuLayer(0)}>Puzzles</div>
		<div class = "menu_item" onClick = {() => infoContext.setMenuLayer(1)}>Statistics</div>
		<div class = "menu_item" onClick = {() => infoContext.setMenuLayer(2)}>Preferences</div>
		</div>
	);
}

export default Menu;