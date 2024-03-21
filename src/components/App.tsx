import { Pomodoro } from "./Pomodoro";
import { Canvas } from "@react-three/fiber";
import { FloatingSpheres } from "./FloatingSpheres";
//import { OrbitControls, Scroll } from "@react-three/drei";
import { createDb } from "../invokes/db";

import "../stylesheets/App.css";
import "../stylesheets/JellySphere.css";
//create a db to hold the persistent data if it doesn't exist
createDb("user_data");

function App() {
	return (
		<div className="app">
			<Pomodoro />
			<Canvas className="mesh--jelly-sphere">
				<ambientLight intensity={Math.PI / 3} />

				<directionalLight position={[-2, 5, 2]} intensity={0.1} />
				<FloatingSpheres />
			</Canvas>
		</div>
	);
}

export default App;
