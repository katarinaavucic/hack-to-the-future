"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from 'framer-motion';

function AppleMacintosh() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("appleMacintoshCanvas"),
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 0);
      camera.position.z = 750;

      const controls = new OrbitControls(camera, renderer.domElement);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // // Add Line and Text
      // // Create Line and Material
      // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 20 });
      // const points = [
      //   new THREE.Vector3(20, 50, 0), // Starting point in 3D space
      //   new THREE.Vector3(0, 0, 0)   // Placeholder for the dynamic endpoint
      // ];
      // const geometry = new THREE.BufferGeometry().setFromPoints(points);
      // const line = new THREE.Line(geometry, lineMaterial);
      // scene.add(line);

      let canvasTexture; // Texture for the screen
      let context; // Canvas context
      let screenMesh; // Reference to the screen mesh
      let cursorVisible = true; // State to toggle the cursor visibility
      let lastCursorToggleTime = 0; // Track time to toggle cursor

      // Initialize canvas and texture
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      context = canvas.getContext("2d");
      context.fillStyle = "#111111"; // Black background
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#00ff00"; // Green text
      context.font = "16px monospace";
      context.fillText("Hello, World!", 10, 30);
      canvasTexture = new THREE.CanvasTexture(canvas);

      // Load GLTF model
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "/assets/apple_macintosh/scene.gltf",
        (gltfScene) => {
          console.log("GLTF Scene:", gltfScene);

          // Traverse the model to find the screen mesh
          screenMesh = gltfScene.scene.getObjectByName("Object_5"); // Replace with actual name
          if (screenMesh) {
            screenMesh.material = new THREE.MeshBasicMaterial({
              map: canvasTexture,
            });
          }

          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.position.y = 3;
          gltfScene.scene.scale.set(10, 10, 10);
          scene.add(gltfScene.scene);
        },
        undefined,
        (error) => {
          console.error("An error occurred while loading the model:", error);
        }
      );

      // Update the canvas texture with new text
      const updateCanvasText = (text) => {
        if (!context || !screenMesh) return;

        // Clear the previous text
        context.fillStyle = "#111111"; // Clear previous text
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#00ff00"; // Green text

        // Draw each line of text
        let yPosition = 30; // Initial y-position for the first line
        const lineHeight = 20; // Height for each line

        // Split the text into lines that fit within the canvas width
        const lines = text.split("\n");
        lines.forEach((line) => {
          context.fillText(line, 10, yPosition);
          yPosition += lineHeight;
        });

        // Draw the cursor at the end of the current line
        const cursorX = 10 + context.measureText(lines[lines.length - 1]).width; // Position at end of last line
        const cursorY = yPosition - lineHeight - 14; // Cursor at the bottom of the last line
        if (cursorVisible) {
          context.fillStyle = "#00ff00"; // Cursor color (green)
          context.fillRect(cursorX, cursorY, 8, 16); // Draw the cursor
        }

        canvasTexture.needsUpdate = true; // Ensure the texture updates
      };

      // Listen for keyboard input
      let inputText = "";

      window.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          inputText = inputText.slice(0, -1); // Remove last character
        } else if (event.key === "Enter") {
          inputText += "\n"; // Add a newline when Enter is pressed
        } else if (event.key.length === 1) {
          inputText += event.key; // Append character to input
        }
        inputText = inputText.toUpperCase();
        if (inputText === "10 PRINT \"HELLO WORLD!\"\n20 GOTO 10") {
          console.log('Successful Input');
        }
        updateCanvasText(inputText);

      });

      // Function to toggle the cursor visibility
      const toggleCursorVisibility = () => {
        const now = Date.now();
        if (now - lastCursorToggleTime > 500) { // Toggle every 500ms
          cursorVisible = !cursorVisible;
          lastCursorToggleTime = now;
          updateCanvasText(inputText); // Update text with cursor toggle
        }
      };

      // Animation loop
      const animate = () => {
        // // Update the dynamic endpoint of the line
        // const screenVector = new THREE.Vector3(10, 10, 0.5); // Screen position
        // screenVector.unproject(camera); // Convert to world coordinates

        // // Update the second point of the line
        // points[1].copy(screenVector);

        // // Update the geometry with the new points
        // geometry.setFromPoints(points);
        requestAnimationFrame(animate);
        controls.update();
        toggleCursorVisibility(); // Toggle cursor visibility
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }, []);

  const [leftText, setLeftText] = useState(
    "The Apple Macintosh, launched in 1984, revolutionized personal computing by introducing a user-friendly graphical user interface (GUI) and the innovative use of a mouse, setting it apart from text-based systems. It democratized computing, making technology accessible to non-technical users and influencing future GUI designs. The Mac became a platform for creative industries, thanks to software like Adobe Photoshop and Aldus PageMaker. Its emphasis on aesthetics, integration of hardware and software, and intuitive design set new standards in computing, sparking innovation across the industry and shaping how people interact with computers."
  ); const [rightText, setRightText] = useState(
    "Here's how to print hello world"
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        id="appleMacintoshCanvas"
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

export default AppleMacintosh;
