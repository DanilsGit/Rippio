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
            .load('https://c1.wallpaperflare.com/preview/56/434/430/background-photos-grass-green.jpg');
        scene.background = skyTexture;

        // Se crea un toro
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFaFa0,
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        // Se añaden cinco puntos de luz
        let lights = [];
        for (let i = 0; i < 5; i++) {
            lights[i] = new THREE.PointLight(0xffffff);
            lights[i].position.set(0, 30, 25 - i * 20);
            // Aumentar la luminosidad
            lights[i].intensity = 500;
            scene.add(lights[i]);
        }

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
        // const controls = new OrbitControls(camera, renderer.domElement);

        //Se establecen las posiciones de la camara: x, y, z
        camera.position.set(0, 45, 20);
        camera.lookAt(0, 0, 50);


        //Se importa el modelo 3D de la mesa
        const loader = new GLTFLoader();
        loader.load('/three-js/assets/diningtable/scene.gltf', (gltf) => {
            gltf.scene.scale.set(0.1, 0.1, 0.1);
            gltf.scene.position.set(0, 0, 0);
            scene.add(gltf.scene);
        });

        //Se añade un objeto 3D de los platos
        // Se añade un objeto 3D de los platos
        let leftplates = [];
        let rightplates = [];
        loader.load('/three-js/assets/plate/scene.gltf', (gltf) => {
            for (let i = 0; i < 5; i++) {
                leftplates[i] = gltf.scene.clone();
                leftplates[i].scale.set(4.5, 4.5, 4.5);
                leftplates[i].position.set(10, 24, 30 - i * 15);

                rightplates[i] = gltf.scene.clone();
                rightplates[i].scale.set(4.5, 4.5, 4.5);
                rightplates[i].position.set(-10, 24, 30 - i * 15);


                scene.add(leftplates[i]);
                scene.add(rightplates[i]);
            }
        });





        let prevT = 0;
        //Scroll para alejar o acercar la camara
        function moveCamara() {
            const t = document.body.getBoundingClientRect().top;
            if (camera.position.z > -40) {
                if (prevT > t) {
                    camera.position.z -= 0.5;
                } else {
                    camera.position.z += 0.5;
                }
            } else {
                camera.position.z = -40;
            }
            prevT = t;
        }
        document.body.onscroll = moveCamara;


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
            // torus.position.y = Math.sin(Date.now() * 0.001) * 5;
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