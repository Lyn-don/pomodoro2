import { useFrame } from "@react-three/fiber";
import React, { useState, useRef, useEffect } from "react";

export function JellySphere(props: any) {
	const ref = useRef();
	if (ref.current !== undefined) {
		useFrame((state, delta) => {
			console.log(delta);
			ref.current.rotation.x += delta;
		});
	}

	return (
		<mesh {...props} ref={ref} scale={1}>
			<sphereGeometry args={[2, 50, 50]} />
			<meshStandardMaterial
				wireframe={props.wireframe}
				color={props.color}
			/>
		</mesh>
	);
}
