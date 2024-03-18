import { useState, useEffect, useRef } from "react";
import "../stylesheets/Timer.css";
interface TimerPropsI {
	run: boolean;
	workBreak: number;
}

/*Converts number of seconds to minutes and seconds string => 61 seconds to 1:01*/
function timerFormate(seconds: number): string {
	let minute: number = (seconds - (seconds % 60)) / 60;
	let second: number = seconds % 60;
	return `${minute > 9 ? minute : "0" + minute}:${
		second > 9 ? second : "0" + second
	}`;
}

export function Timer({ run, workBreak }: TimerPropsI) {
	//in milliseconds
	const [endTime, setEndTime] = useState(0);
	const [startTime, setStartTime] = useState(0);
	//in seconds
	const [timer, setTimer] = useState(0);

	console.log(run);
	useEffect(() => {
		//set the need values if empty
		if (!endTime || !startTime) {
			//current time timestamp
			let timestamp = new Date().getTime();
			setStartTime(timestamp);
			//set to 25 mins in the future
			setEndTime(timestamp + workBreak * 1000);
		}

		if (run && startTime < endTime && timer > 0) {
			let shiftTimeInterval = setInterval(() => {
				setStartTime(startTime + 1000);
				setTimer(timer - 1);
			}, 1000);

			return () => {
				clearInterval(shiftTimeInterval);
			};
		}
	}, [run, timer]);

	useEffect(() => {
		//current time timestamp
		let timestamp = new Date().getTime();
		setStartTime(timestamp);
		//set to 25 mins in the future
		setEndTime(timestamp + workBreak * 1000);

		setTimer(workBreak);
	}, [workBreak]);

	return (
		<div className="div--timer">
			<div className="div--time">{timerFormate(timer)}</div>
			<div className="div--button-wrapper">
				<button
					className="button--small"
					onClick={() => {
						//setRun(false);
						setEndTime(endTime + 60000);
						setTimer(timer + 60);
						//setRun(true);
					}}
				>
					+
				</button>
				<button
					className="button--small"
					onClick={() => {
						//current time timestamp
						let timestamp = new Date().getTime();
						setStartTime(timestamp);
						console.log(workBreak, timer);
						//set to 25 mins in the future
						setEndTime(timestamp + workBreak * 1000);
						setTimer(workBreak);
					}}
				>
					Reset
				</button>
				<button
					className="button--small"
					onClick={() => {
						if (timer > 0) {
							setEndTime(endTime - 60000);
							setTimer(timer - 60);
						}
					}}
				>
					-
				</button>
			</div>
		</div>
	);
}
