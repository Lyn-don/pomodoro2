import { Suspense, useState } from "react";
import { Pomodoro } from "./Pomodoro";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { createDb } from "../invokes/db";

import { JellySphere } from "./JellySphere";
import "../stylesheets/App.css";
import "../stylesheets/JellySphere.css";

//create a db to hold the persistent data if it doesn't exist
createDb("user_data");

function App() {
	return (
		<div className="app">
			<Pomodoro />
			<Canvas className="div--jelly-sphere">
				<OrbitControls enableZoom={false} />
				<ambientLight intensity={Math.PI / 2} />

				<directionalLight position={[-2, 5, 2]} intensity={1} />

				<Suspense fallback={false}>
					<JellySphere />
				</Suspense>
			</Canvas>
			;
		</div>
	);
	{
		/**/
	}
}

export default App;
