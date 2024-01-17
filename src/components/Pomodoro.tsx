import { useState } from "react";
import { Timer } from "./Timer";
import "../stylesheets/Pomodoro.css";

export function Pomodoro() {
	const [run, setRun] = useState(false);
	const [workBreak, setWorkBreak] = useState(1500);

	//console.log(workBreak);
	return (
		<div>
			<button
				onClick={() => {
					setRun(!run);
				}}
			>
				Start/Stop
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
				Work/Break
			</button>

			<Timer run={run} workBreak={workBreak} />
		</div>
	);
}
