import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { MeshDistortMaterial, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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
import { Physics, RigidBody } from "@react-three/rapier";
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
				<Physics>
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
						<Text props={{ position: [0, -6.7, -24] }}>
							{timer}
						</Text>
						<Text props={{ position: [0, -6.7, -16] }}>
							{timer}
						</Text>
						<Text props={{ position: [0, -6.7, -8] }}>{timer}</Text>
						<Text props={{ position: [0, -6.7, 0] }}>{timer}</Text>
						<Text props={{ position: [0, -6.7, 8] }}>{timer}</Text>
						<Text props={{ position: [0, -6.7, 16] }}>{timer}</Text>
						<Text props={{ position: [0, -6.7, 24] }}>{timer}</Text>
					</Center>
					<Grid />
				</Physics>
			</Suspense>

			<Environment resolution={32}>
				<group rotation={[-Math.PI / 4, -0.3, 0]}>
					<Lightformer
						intensity={5}
						rotation-y={Math.PI / 2}
						position={[-5, -1, -1]}
						scale={[10, 2, 1]}
					/>
					<Lightformer
						intensity={10}
						rotation-y={-Math.PI / 2}
						position={[10, 1, 0]}
						scale={[20, 2, 1]}
					/>
					<Lightformer
						type="ring"
						intensity={5}
						rotation-y={Math.PI / 2}
						position={[-0.1, -1, -5]}
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
						0,
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
			position={[0, -0.01, 0]}
		/>
	</Instances>
);

function Text({ children, props }: any) {
	const [color, setColor] = useState([250, 50, 50]);

	//const texture = useLoader(RGBELoader, "/src/media/jelly.hdr");

	return (
		<Text3D
			onClick={() => {
				if (color[0] == 250) {
					setColor([150, 200, 0]);
				} else {
					setColor([250, 50, 50]);
				}
			}}
			castShadow={false}
			bevelEnabled={true}
			bevelThickness={0.1}
			bevelSize={0.08}
			bevelSegments={8}
			scale={5}
			letterSpacing={0.3}
			height={0.5}
			curveSegments={15}
			rotation={[-Math.PI / 2, 0, 0]}
			position={props.position}
			font={"/src/media/Titillium Web_Regular.json"}
		>
			{children}
			<MeshTransmissionMaterial
				reflectivity={0.5}
				transmission={1.5}
				thickness={0.5}
				temporalDistortion={0.3}
				distortionScale={0.5}
				backsideThickness={1}
				clearcoat={0.1}
				clearcoatRoughness={0.3}
				backside={true}
				chromaticAberration={0.2}
				color={`rgb(${color[0]},${color[1]},${color[2]})`}
			/>
		</Text3D>
	);
}
