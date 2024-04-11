import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { MeshDistortMaterial, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
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
	const [timer, setTimer] = useState<Array<string>>([""]);
	/*const texture = useLoader(
		RGBELoader,
		"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
	);*/
	useEffect(() => {
		setTimer(props.timer.split(""));
	}, [props]);

	return (
		<Canvas
			shadows
			orthographic
			camera={{ position: [-10, 25, 20], zoom: 70 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense>
				<Physics>
					<OrbitControls
						maxZoom={70}
						minZoom={50}
						zoomSpeed={0.5}
						enablePan={false}
						dampingFactor={0.05}
						minPolarAngle={Math.PI / 4}
						maxPolarAngle={Math.PI / 4}
					/>
					<Center>
						{/*timer.map((char, key) => {
							return (
								<Text key={key} props={{ key: key }}>
									{char}
								</Text>
							);
						})*/}
						<Text>{timer}</Text>
					</Center>

					<Grid />
				</Physics>
			</Suspense>

			<Environment resolution={32}>
				<group rotation={[-Math.PI / 4, -0.3, 0]}>
					<Lightformer
						intensity={2}
						rotation-y={Math.PI / 2}
						position={[-5, -1, -1]}
						scale={[10, 2, 1]}
					/>
					<Lightformer
						intensity={2}
						rotation-y={-Math.PI / 2}
						position={[10, 1, 0]}
						scale={[20, 2, 1]}
					/>
					<Lightformer
						type="ring"
						intensity={2}
						rotation-y={Math.PI / 2}
						position={[-0.1, -1, -5]}
						scale={10}
					/>
				</group>
			</Environment>
		</Canvas>
	);
}

function Floor() {
	const texture = useLoader(RGBELoader, "/src/media/test_bg.hdr");
	return (
		<RigidBody
			type="fixed"
			position={[0, -5, 0]}
			friction={0}
			scale={1}
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<mesh castShadow>
				<planeGeometry args={[100, 100]} />
				<MeshDistortMaterial />
			</mesh>
		</RigidBody>
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

function Text({ children }: any) {
	const texture = useLoader(RGBELoader, "/src/media/jelly.hdr");
	const [color, setColor] = useState("red");
	return (
		<Text3D
			onPointerOver={() => {
				setColor("blue");
			}}
			onPointerOut={() => {
				setColor("red");
			}}
			castShadow={true}
			bevelEnabled={true}
			bevelThickness={0.1}
			bevelSize={0.05}
			bevelSegments={30}
			scale={4}
			letterSpacing={0.3}
			height={0.3}
			curveSegments={50}
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, -7.5, 0]}
			font={"/src/media/Titillium Web_Regular(1).json"}
		>
			{children}
			<MeshTransmissionMaterial
				reflectivity={0.5}
				transmission={1}
				thickness={0.5}
				temporalDistortion={0.3}
				distortionScale={0.3}
				backsideThickness={1}
				clearcoat={0.1}
				clearcoatRoughness={1}
				backside={true}
				chromaticAberration={0.5}
				background={texture}
				color={color}
			/>
		</Text3D>
	);
}
