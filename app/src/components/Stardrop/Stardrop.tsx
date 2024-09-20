import { Effect } from "effect";
import gsap from "gsap";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import {
	onCleanup,
	onMount,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";
import { ServiceContext } from "~/services/context";
import { Theme, ThemeService } from "~/services/theme";
import { useTransition } from "~/services/transition";
import styles from "./Stardrop.module.scss";

/**
 * A portmanteau that combines "star" and "backdrop". A starry backdrop
 * that fades in after the mounting transition is completed.
 */
const Stardrop = () => {
	const Context = useContext(ServiceContext);

	if (!Context) {
		throw new Error("NuttyverseRuntime is not provided");
	}

	const NuttyverseRuntime = Context.NuttyverseRuntime;

	let container!: HTMLDivElement;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let starField: THREE.Group;

	const idleSpeed = 1;
	const warpSpeed = 20;

	// How fast are we moving through the star field?
	const [velocity, setVelocity] = createSignal(idleSpeed);

	const white = "#fcfcfc";
	const black = "#070707";

	const { transitionState } = useTransition();

	const faSparkle = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path d="M245.8 45.9C241.9 37.4 233.4 32 224 32s-17.9 5.4-21.8 13.9L142.7 174.7 13.9 234.2C5.4 238.1 0 246.6 0 256s5.4 17.9 13.9 21.8l128.8 59.5 59.5 128.8c3.9 8.5 12.4 13.9 21.8 13.9s17.9-5.4 21.8-13.9l59.5-128.8 128.8-59.5c8.5-3.9 13.9-12.4 13.9-21.8s-5.4-17.9-13.9-21.8L305.3 174.7 245.8 45.9z"/>
		</svg>
	`;

	const updateBackground = () => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				const store = themeService.store;

				if (scene && renderer && camera) {
					const color = store.theme === Theme.Light ? white : black;
					scene.background = new THREE.Color(color);
					renderer.render(scene, camera);
				}
			}),
		);
	};

	const updateStarColors = () => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				const store = themeService.store;

				if (starField) {
					const color = store.theme === Theme.Light ? black : white;

					starField.children.forEach((star) => {
						const material = (star as THREE.Mesh).material;
						(material as THREE.MeshBasicMaterial).color.set(color);
					});
				}
			}),
		);
	};

	const createStarShape = () => {
		const loader = new SVGLoader();
		const svgData = loader.parse(faSparkle);
		const svgShape = svgData.paths[0].toShapes(true)[0];

		return new THREE.ShapeGeometry(svgShape);
	};

	const createStarField = () => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				const store = themeService.store;

				const starGeometry = createStarShape();
				starField = new THREE.Group();

				const initialColor = store.theme === Theme.Light ? black : white;
				const starCount = 777;
				const starFieldSize = 2222;

				for (let i = 0; i < starCount; i++) {
					const material = new THREE.MeshBasicMaterial({
						color: initialColor,
						side: THREE.DoubleSide,
						opacity: Math.random() * 0.5 + 0.5,
						transparent: true,
					});

					const starMesh = new THREE.Mesh(starGeometry, material);

					starMesh.position.set(
						(Math.random() - 0.5) * starFieldSize,
						(Math.random() - 0.5) * starFieldSize,
						(Math.random() - 0.5) * starFieldSize,
					);

					const scale = Math.random() * 0.02;
					starMesh.scale.set(scale, scale, scale);

					starField.add(starMesh);
				}

				scene.add(starField);
			}),
		);
	};

	function animateStarField() {
		requestAnimationFrame(animateStarField);

		starField.children.forEach((star) => {
			star.position.z += velocity();

			if (star.position.z > 1000) {
				star.position.z -= 2000;
			}
		});

		renderer.render(scene, camera);
	}

	const handleResize = () => {
		if (camera && renderer) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
	};

	const initializeThreeJS = () => {
		scene = new THREE.Scene();

		const fieldOfView = 75;
		const aspectRatio = window.innerWidth / window.innerHeight;
		const nearPlane = 0.1;
		const farPlane = 2000;

		camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane,
		);

		camera.position.z = 500;

		renderer = new THREE.WebGLRenderer({
			antialias: true,
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		createStarField();
		updateBackground();
		animateStarField();

		window.addEventListener("resize", handleResize);

		onCleanup(() => {
			window.removeEventListener("resize", handleResize);
			renderer.dispose();
		});
	};

	onMount(() => {
		// Hide the star field until it's ready.
		gsap.set(container, { opacity: 0 });
		initializeThreeJS();
	});

	createEffect(() => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;

				// When the theme changes …
				themeService.store.theme;

				// … update the background and star colors.
				updateBackground();
				updateStarColors();
			}),
		);
	});

	createEffect(() => {
		// After the mounting transition is completed …
		if (transitionState()?.value === "idle") {
			// … fade in the star field.
			gsap.to(container, {
				opacity: 1,
				duration: 1.5,
				ease: "none",
			});
		}

		if (transitionState()?.value === "idle") {
			setVelocity(idleSpeed);
		} else {
			// Zoom zoom!
			setVelocity(warpSpeed);
		}
	});

	return <div id="stardrop" ref={container} class={styles.stardrop} />;
};

export { Stardrop };
