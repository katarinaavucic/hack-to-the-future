"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x01204e );
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myThreeJsCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 750; 

      const controls = new OrbitControls(camera, renderer.domElement)

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Load GLTF model
      let loadedModel;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/apple_macintosh/scene.gltf', (gltfScene) => {
        loadedModel = gltfScene;
        console.log('Model loaded:', loadedModel);
        gltfScene.scene.rotation.y = Math.PI / 8;
        gltfScene.scene.position.y = 3;
        gltfScene.scene.scale.set(10, 10, 10);
        scene.add(gltfScene.scene);
      }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update()
        renderer.render(scene, camera);
        console.log('Rendering scene');
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;