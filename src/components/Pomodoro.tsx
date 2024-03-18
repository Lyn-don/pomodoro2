import { useState } from "react";
import { Timer } from "./Timer";
import "../stylesheets/Pomodoro.css";

export function Pomodoro() {
	const [run, setRun] = useState(false);

	//1500 equals to 25 minutes
	const [workBreak, setWorkBreak] = useState(1500);

	return (
		<div className="div--pomodoro-wrapper">
			<div className="div--pomodoro">
				<div className="div--button-wrapper">
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
				</div>
				<Timer run={run} workBreak={workBreak} />
			</div>
		</div>
	);
}
