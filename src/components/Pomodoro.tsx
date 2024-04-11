import { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { play_alarm } from "../invokes/tauri";
import "../stylesheets/Pomodoro.css";
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

export function Pomodoro() {
	const [run, setRun] = useState(false);

	//1500 equals to 25 minutes
	const [workBreak, setWorkBreak] = useState(1500);

	//in milliseconds
	const [endTime, setEndTime] = useState(0);
	const [startTime, setStartTime] = useState(0);

	//in seconds
	const [timer, setTimer] = useState(0);

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
				console.log(timer - 1);
				if (timer - 1 == 0) {
					play_alarm();
				}
			}, 1000);

			return () => {
				//clean up process
				clearInterval(shiftTimeInterval);
			};
		}
	}, [run, timer]);

	//reset if switch from break to work or vice versa
	useEffect(() => {
		//current time timestamp
		let timestamp = new Date().getTime();
		setStartTime(timestamp);
		//set to 25 mins in the future
		setEndTime(timestamp + workBreak * 1000);

		setTimer(workBreak);
	}, [workBreak]);
	return (
		<div className="div--pomodoro">
			<div className="div--top-controls">
				<button
					onClick={() => {
						setRun(!run);
					}}
				>
					PLAY/PAUSE
				</button>
				<button
					onClick={() => {
						if (workBreak > 300) {
							setWorkBreak(300);
						} else {
							setWorkBreak(1500);
						}
					}}
				>
					WORK/BREAK
				</button>
			</div>

			<div className="div--bottom-controls">
				<button
					onClick={() => {
						setEndTime(endTime + 60000);
						setTimer(timer + 60);
					}}
				>
					+
				</button>
				<button
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
					RESET
				</button>
				<button
					onClick={() => {
						if (timer > 0) {
							setEndTime(endTime - 60000);
							let t = timer - 60;
							console.log(timer);
							if (t <= 0) {
								t = 0;
							}
							setTimer(t);
						}
					}}
				>
					-
				</button>
			</div>
			<div className="div--timer">
				<Timer props={{ timer: timerFormate(timer) }} />
			</div>
		</div>
	);
}
