"use client"
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
  const [inputText, setInputText] = useState("");
  const sceneRef = useRef(null);
  const textureRef = useRef({
    textPlane: null,
    canvasTexture: null,
    canvas: null,
    context: null
  });

  // Function to update canvas text
  const updateCanvasText = (text) => {
    const { context, canvasTexture, canvas } = textureRef.current;
    if (!context || !canvasTexture || !canvas) return;

    // Clear the canvas with a fully transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    context.fillStyle = '#FFFFFF';
    context.font = '28px arial';
    
    // Draw text
    const lines = text.split("\n");
    let yPosition = 100;
    const lineHeight = 60;
    
    lines.forEach((line) => {
      context.fillText(line, 50, yPosition);
      yPosition += lineHeight;
    });

    canvasTexture.needsUpdate = true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x01204e);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 400, 200);
    
    // Setup renderer with alpha
    const renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('myThreeJsCanvas'),
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create background plane
    const backgroundTexture = new THREE.TextureLoader().load('/assets/chatgpt.png');
    const backgroundMaterial = new THREE.MeshBasicMaterial({
      map: backgroundTexture,
      transparent: true,
      opacity: 1,
    });

    const backgroundPlane = new THREE.Mesh(new THREE.PlaneGeometry(256, 150), backgroundMaterial);
    backgroundPlane.position.set(-40, 113, -95);
    backgroundPlane.rotation.set(0, 0.4, 0);
    scene.add(backgroundPlane);

    // Create and setup canvas for text with alpha support
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d', { alpha: true });
    
    textureRef.current.canvas = canvas;
    textureRef.current.context = context;

    // Create text plane with proper alpha handling
    const planeGeometry = new THREE.PlaneGeometry(256, 150);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.premultiplyAlpha = false; // Important for proper transparency
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: canvasTexture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      alphaTest: 0.1 // Help eliminate transparency artifacts
    });

    const textPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    textPlane.position.set(7, 47, -114);
    textPlane.rotation.set(0, 0.4, 0);
    
    // Store references
    textureRef.current.textPlane = textPlane;
    textureRef.current.canvasTexture = canvasTexture;
    
    // Add plane to scene
    scene.add(textPlane);

    // Initial text update
    updateCanvasText(inputText);

    // Load GLTF model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/assets/laptop/scene.gltf', (gltfScene) => {
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      scene.add(gltfScene.scene);
    });

    // Event listener for key input
    const handleKeyInput = (event) => {
      if (event.key === "Backspace") {
        setInputText(prev => prev.slice(0, -1));
      } else if (event.key === "Enter") {
        setInputText(prev => prev + "\n");
      } else if (event.key.length === 1) {
        setInputText(prev => prev + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyInput);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyInput);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update canvas whenever inputText changes
  useEffect(() => {
    updateCanvasText(inputText);
  }, [inputText]);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;