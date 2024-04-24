import { useEffect } from "react";
import { createDb } from "../invokes/db";
import { Pomodoro } from "./Pomodoro";

import "../stylesheets/App.css";

function App() {
	useEffect(() => {
		//create a db to hold the persistent data if it doesn't exist on mount
		createDb("user_data");
		console.log("fart");
	}, []);

	return (
		<div className="app">
			<Pomodoro />
		</div>
	);
}

export default App;
