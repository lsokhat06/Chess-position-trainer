import './Preferences.css';
import { useContext } from 'react';
import InfoContext from '../../../context/info.context';

function Preferences(props) {
	let infoContext = useContext(InfoContext);
	function makeHTML(data, name) {
		if (localStorage.getItem(name) === null) {
			let items = [];
			let states = {}
			for (const item of data) {
				items.push(
					<div>
					<input type = "checkbox" class = "check_item" id = {item} onClick = {() => infoContext.changePreferenceState(item, name)}/>
					<label class = "tabletext">{item}</label>
					</div>
				);
				states[item] = false;
			}
			localStorage.setItem(name, JSON.stringify(states));
			return items;
		}
		else if (localStorage.getItem(name) !== null) {
			let states = JSON.parse(localStorage.getItem(name));
			let items = [];
			for (const item of data) {
				items.push(
					<div>
					<input type = "checkbox" defaultChecked = {states[item]} class = "check_item" id = {item} onClick = {() => infoContext.changePreferenceState(item, name)}/>
					<label class = "tabletext">{item}</label>
					</div>
				);
			}
			return items;
		}
	}
	return (
		<div class = "preferences">
		<p class = "title">Themes</p>
		<div class = "table">
			{makeHTML(props.themes, "themes")}
		</div>
		<p class = "title">Openings</p>
		<div class = "table">
			{makeHTML(props.openings, "openings")}
		</div>
		</div>
	)
}

export default Preferences;