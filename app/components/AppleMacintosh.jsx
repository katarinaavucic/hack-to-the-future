"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function AppleMacintosh() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize scene, camera, and renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x01204e);
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
      // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0ffffff }, { linewidth: 10 });
      // const points = [];

      // var screenVector = new THREE.Vector3(320, 200, 0.5);
      // screenVector.unproject(camera);

      // points.push(new THREE.Vector3(- 10, 0, 0));
      // points.push(screenVector);
      // points.push(new THREE.Vector3(10, 0, 0));

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

  return (
    <div>
      <canvas id="appleMacintoshCanvas" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default AppleMacintosh;
