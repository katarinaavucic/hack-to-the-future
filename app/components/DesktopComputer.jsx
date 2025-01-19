"use client"
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

function DesktopComputer() {
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
    if (inputText === 'print("Hello, World!")') { // Check if correct input
      console.log('Successful Input');
    }

    const { context, canvasTexture, canvas } = textureRef.current;
    if (!context || !canvasTexture || !canvas) return;

    // Clear the canvas with a transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    context.fillStyle = 'black';
    context.font = '48px monospace';
    
    // Draw text
    const lines = text.split("\n");
    let yPosition = 160;
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
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 40, 20);
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('desktopComputerCanvas'),
      antialias: true
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
    const backgroundTexture = new THREE.TextureLoader().load('/assets/eclipse.png');
    const backgroundMaterial = new THREE.MeshBasicMaterial({
      map: backgroundTexture,
      transparent: true,
      opacity: 1,
    });

    const backgroundPlane = new THREE.Mesh(new THREE.PlaneGeometry(24, 15), backgroundMaterial);
    backgroundPlane.position.set(-7.5, 13.5, -9.1);
    backgroundPlane.rotation.set(0, 0.65, 0);
    scene.add(backgroundPlane);

    // Create and setup canvas for text
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    
    textureRef.current.canvas = canvas;
    textureRef.current.context = context;

    // Create text plane
    const planeGeometry = new THREE.PlaneGeometry(24, 15);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: canvasTexture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });

    const textPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    textPlane.position.set(-7.5, 13.5, -9);  // Slightly in front of background
    textPlane.rotation.set(0, 0.65, 0);
    
    // Store references
    textureRef.current.textPlane = textPlane;
    textureRef.current.canvasTexture = canvasTexture;
    
    // Add plane to scene
    scene.add(textPlane);

    // Initial text update
    updateCanvasText(inputText);

    // Load GLTF model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/assets/desktop_pc/scene.gltf', (gltfScene) => {
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

  
  const [leftText, setLeftText] = useState(
    "Python, a high-level general-purpose coding language, was developed in the late 1980s by programmer Guido van Rossum. Its name comes from the British comedy series 'Monty Python's Flying Circus', which Van Rossum gave was reading at the time of its creation. The language gained popularity for its readability and close assosciation to human language, making it one of the most popular coding languages today!"
  ); const [rightText, setRightText] = useState(
    "Here's how to print hello world in Python\n\nprint(\"Hello, World!\")"
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        id="desktopComputerCanvas"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Left-Aligned Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          fontSize: "14px",
          fontFamily: "monospace",
          background: "rgba(0, 0, 0, 0)",
          padding: "10px",
          borderRadius: "8px",
          width: "300px", // Ensure consistent width for better justification
        }}
      >
        {leftText}
      </motion.div>

      {/* Right-Aligned Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 4 }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          textAlign: "right",
          color: "white",
          fontSize: "14px",
          fontFamily: "monospace",
          background: "rgba(0, 0, 0, 0)",
          padding: "10px",
          borderRadius: "8px",
          width: "300px", // Ensure consistent width for better justification
        }}
      >
        {rightText}
      </motion.div>
    </div>
  );
}

export default DesktopComputer;
