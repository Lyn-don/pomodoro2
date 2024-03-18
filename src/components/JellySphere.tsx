//import { ThreeElements } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";

export function JellySphere() {
	return (
		<Sphere visible args={[1, 100, 200]} scale={2}>
			<MeshDistortMaterial
				distort={0.5}
				speed={1}
				color="rgb(100, 300, 200)"
			/>
		</Sphere>
	);
}
