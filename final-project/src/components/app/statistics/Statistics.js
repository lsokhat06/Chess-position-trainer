import './Statistics.css';
import InfoContext from '../../../context/info.context';

import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from "react";


ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

ChartJS.defaults.backgroundColor = '#93C8F0';
ChartJS.defaults.borderColor = '#93C8F0';
ChartJS.defaults.color = '#93C8F0';
ChartJS.defaults.fontSize = 12;

export function Statistics() {
  let infoContext = useContext(InfoContext);
  let today = infoContext.getNormalDate();
  let stats = JSON.parse(localStorage.getItem("stats"));
  let ns = [];
  let today_ns = [];
  for (let i = 0; i < stats["ratingDynamics"].length; ++i) { ns.push(i + 1); }
  for (let i = 0; i < stats[today]["ratingDynamics"].length; ++i) { today_ns.push(i + 1); }
  let chartData = {
      labels: ns,
      datasets: [
        {
          label: 'Rating', 
          data: stats["ratingDynamics"]
        }   
      ]
  };
  let chartDataT = {
      labels: today_ns,
      datasets: [
        {
          label: 'Rating', 
          data: stats[today]["ratingDynamics"]
        }   
      ]
  };



  let solvedPercent = (stats["puzzlesSolved"] / stats["puzzlesStarted"]) * 100;
  solvedPercent = Math.round(solvedPercent * 100) / 100;

  let lostPercent = (stats["puzzlesFailed"] / stats["puzzlesStarted"]) * 100;
  lostPercent = Math.round(lostPercent * 100) / 100;

  let solvedPercentToday = (stats[today]["puzzlesSolved"] / stats[today]["puzzlesStarted"]) * 100;
  solvedPercentToday = Math.round(solvedPercentToday * 100) / 100;

  let lostPercentToday = (stats[today]["puzzlesFailed"] / stats[today]["puzzlesStarted"]) * 100;
  lostPercentToday = Math.round(lostPercentToday * 100) / 100;

  return (
  	<div class = "statistics_block">
        <p class = "stats_title">General</p>
        <div class = "flexwrapper">
            <div class = "rating_progress_chart">
  	           <Line data = {chartData} options = {{ maintainAspectRatio: false }}/>
            </div>
            <div class = "statistics_data">
            <p>Puzzles started: {stats["puzzlesStarted"]}</p>
            <p>Puzzles solved: {stats["puzzlesSolved"]} ({solvedPercent}%)</p>
            <p>Puzzles lost: {stats["puzzlesFailed"]} ({lostPercent}%)</p>
            <p>Average puzzle rating: {stats["avgPuzzleRating"]}</p>
            <p>Best puzzle: rated {stats["highestRatedPuzzle"]}</p>
            </div>
        </div>
        <p class = "stats_title">Today</p>
        <div class = "flexwrapper">
            <div class = "rating_progress_chart">
               <Line data = {chartDataT} options = {{ maintainAspectRatio: false }}/>
            </div>
            <div class = "statistics_data">
            <p>Puzzles started: {stats[today]["puzzlesStarted"]}</p>
            <p>Puzzles solved: {stats[today]["puzzlesSolved"]} ({isNaN(solvedPercentToday) ? 0 : solvedPercentToday}%)</p>
            <p>Puzzles lost: {stats[today]["puzzlesFailed"]} ({isNaN(lostPercentToday) ? 0 : lostPercentToday}%)</p>
            <p>Average puzzle rating: {stats[today]["avgPuzzleRating"]}</p>
            <p>Best puzzle: rated {stats[today]["highestRatedPuzzle"]}</p>
            </div>
        </div>
  	</div>
  );
}


export default Statistics;