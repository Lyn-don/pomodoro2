import React, {
	useEffect,
	useState,
	Suspense,
	useInsertionEffect,
} from "react";
import { JellySphere } from "./JellySphere";

export function FloatingSpheres() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [z, setZ] = useState(0);
	const [frame, setFrame] = useState(0);

	useEffect(() => {}, []);

	return (
		<>
			<Suspense fallback={false}>
				<JellySphere position={[3, 0, -0.2]} color="blue" />
				<JellySphere position={[0, 2, 0.1]} color="yellow" />
				<JellySphere position={[0, 0, 0.2]} color="red" />
			</Suspense>
		</>
	);
}
