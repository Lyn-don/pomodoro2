import { OrbitControls, Text3D, FontData, useFont } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
	Instances,
	Instance,
	Environment,
	Lightformer,
	Center,
	MeshTransmissionMaterial,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import "../stylesheets/Timer.css";

import font from "../media/Titillium Web_Regular.json";

export function Timer({ props }: any) {
	const [timer, setTimer] = useState<Array<string>>([]);

	useEffect(() => {
		setTimer(props.timer.split(""));

		if (timer) {
			document.title = "🍅 " + props.timer + " Pomodoro 🍅";
		}
	}, [props.timer]);

	return (
		<Canvas
			shadows
			orthographic
			camera={{ position: [-10, 25, 20], zoom: 40 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense>
				<OrbitControls
					maxZoom={40}
					minZoom={30}
					zoomSpeed={0.5}
					enablePan={false}
					dampingFactor={0.05}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 4}
				/>
				<Center>
					<Text props={{ position: [0, -5.7, 0] }}>{timer}</Text>
				</Center>
				<Grid />
			</Suspense>

			<Environment resolution={32}>
				<group rotation={[-Math.PI / 4, -0.3, 0]}>
					<Lightformer
						intensity={5}
						color={"pink"}
						rotation-y={Math.PI / 2}
						position={[15, 10, 30]}
						scale={[5, 2, 1]}
					/>
					<Lightformer
						intensity={10}
						color={"purple"}
						rotation-y={-Math.PI / 2}
						position={[-15, 10, 0]}
						scale={[20, 2, 1]}
					/>
					<Lightformer
						type="ring"
						intensity={5}
						rotation-y={Math.PI / 2}
						position={[-10, -5, -6]}
						scale={10}
					/>
				</group>
			</Environment>
		</Canvas>
	);
}

const Grid = ({ number = 30, lineWidth = 0.1, height = 0.5 }) => (
	// Renders a grid and crosses as instances

	<Instances position={[0, -1.02, 0]}>
		<planeGeometry args={[lineWidth, height]} />
		<meshBasicMaterial color="#CFFF04" />
		{Array.from({ length: number }, (_, y) =>
			Array.from({ length: number }, (_, x) => (
				<group
					key={x + ":" + y}
					position={[
						x * 4 - Math.floor(number / 2) * 2,
						-0.25,
						y * 4 - Math.floor(number / 2) * 2,
					]}
				>
					<Instance rotation={[-Math.PI / 2, 0, 0]} />
					<Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
				</group>
			))
		)}
		<gridHelper
			args={[100, 100, "#CFFF04", "#CFFF04"]}
			position={[0, -0.26, 0]}
		/>
	</Instances>
);

function Text({ children, props }: any) {
	const [color, setColor] = useState([250, 50, 50]);

	return (
		<Text3D
			onClick={() => {
				if (color[0] == 250) {
					setColor([150, 200, 0]);
				} else {
					setColor([250, 50, 50]);
				}
			}}
			castShadow={true}
			bevelEnabled={true}
			bevelThickness={0.1}
			bevelSize={0.1}
			bevelSegments={20}
			scale={5}
			letterSpacing={0.4}
			height={0.5}
			curveSegments={30}
			rotation={[-Math.PI / 2, 0, 0]}
			position={props.position}
			/*@ts-ignore*/
			font={font as FontData}
		>
			{children}
			<MeshTransmissionMaterial
				reflectivity={0.8}
				transmission={2}
				thickness={0.7}
				temporalDistortion={0.3}
				distortionScale={0.5}
				backsideThickness={1}
				clearcoat={0.1}
				clearcoatRoughness={0.3}
				backside={true}
				chromaticAberration={0.1}
				color={`rgb(${color[0]},${color[1]},${color[2]})`}
			/>
		</Text3D>
	);
}
