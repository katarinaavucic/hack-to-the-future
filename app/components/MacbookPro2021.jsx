"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x01204e);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myThreeJsCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 750; 

      const controls = new OrbitControls(camera, renderer.domElement);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Load GLTF model
      let loadedModel;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/laptop/scene.gltf', (gltfScene) => {
        loadedModel = gltfScene;
        console.log('GLTF Scene:', gltfScene);

        const screenMesh = gltfScene.scene.getObjectByName("Screen_ComputerScreen_0"); // Replace with actual name
        if (screenMesh) {
          // Create a sample texture (e.g., color or canvas-based)
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          context.fillStyle = '#FFFF00'; // Yellow background
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = '#00ff00'; // Green text
          context.font = '20px Arial';
          context.fillText('Hello, World!', 50, 128);
          const canvasTexture = new THREE.CanvasTexture(canvas);

          screenMesh.material = new THREE.MeshBasicMaterial({ map: canvasTexture });
        }

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
        controls.update();
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
