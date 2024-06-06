import { useRef, useEffect } from 'react'
import './welcomeAnimation.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function WelcomeAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Poner el scroll en (0,0)
        window.scrollTo(0, 0);
        // Se crea lo necesario para el canvas
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });

        // Se ajustan valores al renderer y la cámara
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);

        // Se renderiza la escena
        renderer.render(scene, camera);

        //Se añade fondo de imagen
        const skyTexture = new THREE.TextureLoader()
            .load('https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/WelcomePage%2FbackgroundWelcome.jpg?alt=media&token=2dffed4a-038a-4841-955d-07a980e83c37');
        scene.background = skyTexture;

        // Se añade el punto de luz
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        //se le da luminosidad
        pointLight.intensity = 100;
        scene.add(pointLight);


        // Se añade una luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        // Guía para el punto de luz
        // const lightHelper = new THREE.PointLightHelper(lights[0]);
        // scene.add(lightHelper);

        //Guía tipo grid
        const gridHelper = new THREE.GridHelper(200, 50);
        scene.add(gridHelper);

        // Se añade un control de órbita con muouse
        const controls = new OrbitControls(camera, renderer.domElement);

        //Se establecen las posiciones de la camara: x, y, z
        camera.position.set(0, 0, 30);
        // camera.lookAt(0, 0, 0);


        //Se importa el modelo 3D del perro
        let hotdog;
        const loader = new GLTFLoader();
        loader.load('/three-js/assets/hotdog/scene.gltf', (gltf) => {
            hotdog = gltf;
            gltf.scene.scale.set(1.5, 1.5, 1.5);
            gltf.scene.rotation.set(0, 90, 20);
            gltf.scene.position.set(-20, 15, 0);
            scene.add(gltf.scene);
        });

        let hamburger;
        loader.load('/three-js/assets/hamburger/scene.gltf', (gltf) => {
            hamburger = gltf;
            gltf.scene.scale.set(1.5, 1.5, 1.5);
            gltf.scene.rotation.set(0, 0, 0);
            gltf.scene.position.set(20, 15, 0);
            scene.add(gltf.scene);
        });


        // Se añade un listener para el resize
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();
        });

        const animate = () => {
            requestAnimationFrame(animate);

            // torus.rotation.x += 0.00;
            // torus.rotation.y += 0.005;
            // torus.rotation.z += 0.00;

            // //Movimiento del objeto hacia arriba y hacia abajo
            // //En easeInOut
            if (hotdog && hamburger) {
                hotdog.scene.position.y += Math.sin(Date.now() * 0.001) * 0.02;
                hotdog.scene.rotation.z += 0.001;
                hotdog.scene.rotation.y += 0.001;

                hamburger.scene.position.y += Math.sin(Date.now() * 0.001) * 0.02;
                hamburger.scene.rotation.z += 0.001;
                hamburger.scene.rotation.y += 0.001;

            }
            // // controls.update();

            renderer.render(scene, camera);
        }

        animate();

    }, []);

    return (
        <>
            <canvas className='WelcomeAnimation-canvas' ref={canvasRef}></canvas>
            <main>
                <section className="WelcomeAnimation">
                </section>
                <section className='WelcomeFrame'>
                    <button className='WelcomeButton'>Descubrir</button>
                    <p>Miles de platillos esperando por ti</p>
                    <h1 className='WelcomeTitle'>Rippio Food</h1>
                </section>
            </main>
        </>
    )
}