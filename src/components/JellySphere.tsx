import { ThreeElements } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export function JellySphere(props: ThreeElements["mesh"]) {
	return (
		<Sphere visible args={[1, 100, 200]} scale={2}>
			<MeshDistortMaterial color="blue" />
		</Sphere>
	);
}
