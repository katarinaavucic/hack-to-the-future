"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myThreeJsCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 100; 

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Load GLTF model
      let loadedModel;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/pdp-1_computer/scene.gltf', (gltfScene) => {
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
        // if (loadedModel) {
        //   loadedModel.scene.rotation.x += 0.01;
        //   loadedModel.scene.rotation.y += 0.01;
        //   loadedModel.scene.rotation.z += 0.01;
        // }
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