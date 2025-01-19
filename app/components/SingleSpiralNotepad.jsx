"use client"
import { useEffect,  useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

function SingleSpiralNotepad({setEightSuccess}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('singleSpiralNotepadCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 0);

      // Set camera to bird's-eye view (looking straight down)
      camera.position.set(0, 3.5, 0); // Move camera above the notepad
      camera.lookAt(0, 0, 0); // Make camera look at the center of the notepad (the origin)

      // Remove the OrbitControls since we don't need it for a fixed view
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.minPolarAngle = 0;
      // controls.maxPolarAngle = Math.PI * 0.5;
      // controls.target.set(0.5, 0, 0);
      // controls.enablePan = false;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      var count = 0;

      // Load GLTF model
      let loadedModel;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/single_spiral_notepad/scene.gltf', (gltfScene) => {
        loadedModel = gltfScene;
        console.log('GLTF Scene:', gltfScene);

        // Traverse the model and log each mesh
        gltfScene.scene.traverse((node) => {
          if (node.isMesh) {
            console.log('Mesh found:', node.name, node);
          }
        });

        const screenMesh = gltfScene.scene.getObjectByName("Object_14");
        if (screenMesh) {
          // Create a canvas for the drawing
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          context.fillStyle = '#FEFEFE'; // White background
          context.fillRect(0, 0, canvas.width, canvas.height);
          const canvasTexture = new THREE.CanvasTexture(canvas);

          // Set the material with the canvas texture
          screenMesh.material = new THREE.MeshBasicMaterial({ map: canvasTexture });

          // Track mouse movement for drawing
          let isDrawing = false;
          const mouse = new THREE.Vector2();
          const raycaster = new THREE.Raycaster();

          // Function to update mouse position and check for clicks
          function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          }

          // Function to handle mouse clicks and draw on the texture
          function onMouseDown(event) {
            count++;
            isDrawing = true;
            if (count > 1) {
              setEightSuccess(true);
            }
          }

          // Function to stop drawing on mouse up
          function onMouseUp() {
            isDrawing = false;
          }

          // Raycasting logic to detect click on the notebook page
          function drawOnPage() {
            if (isDrawing) {
              // Set the raycaster based on the mouse position
              raycaster.setFromCamera(mouse, camera);

              // Get intersections with the "Object_14" (the page mesh)
              const intersects = raycaster.intersectObject(screenMesh);
              if (intersects.length > 0) {
                const intersect = intersects[0];
                const uv = intersect.uv;

                // Draw on the canvas at the UV position
                const x = uv.x * canvas.width - 15;
                const y = (1 - uv.y) * canvas.height - 20;

                context.fillStyle = '#000000'; // Black ink
                context.fillRect(x, y, 2, 2); // Draw a small rectangle for the pen

                // Update the texture
                canvasTexture.needsUpdate = true;
              }
            }
          }

          // Event listeners for mouse interaction
          window.addEventListener('mousemove', onMouseMove, false);
          window.addEventListener('mousedown', onMouseDown, false);
          window.addEventListener('mouseup', onMouseUp, false);

          // Animation loop to handle drawing and updates
          const animate = () => {
            requestAnimationFrame(animate);
            drawOnPage(); // Handle drawing
            renderer.render(scene, camera);
          };
          animate();
        }

        gltfScene.scene.rotation.y = (Math.PI / 2) + (Math.PI / 8);
        gltfScene.scene.position.set(0, 0, 0);
        gltfScene.scene.scale.set(10, 10, 10);
        scene.add(gltfScene.scene);
      }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
    // Detect when the Enter key is pressed
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        console.log('Enter key was pressed!');
        // You can add more logic here for what should happen when Enter is pressed
      }
    });
  }, []);

  
  const [leftText, setLeftText] = useState(
    "Welcome to... \n\nHack to the Future!\n\nThis interactive educational experience will guide you through the journey of code, from the early days of computing to the unique nature of programming today.\n\nWe hope that viewing programming through these different perspectives throughout time will allow you a better insight into its evolution."
  ); const [rightText, setRightText] = useState(
    "Please write “Hello World” on the paper."
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        id="singleSpiralNotepadCanvas"
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
        dangerouslySetInnerHTML={{ __html: leftText.replace(/\n/g, "<br />") }}
      />

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
        dangerouslySetInnerHTML={{ __html: rightText.replace(/\n/g, "<br />") }}
      />
    </div>
  );
}

export default SingleSpiralNotepad;
