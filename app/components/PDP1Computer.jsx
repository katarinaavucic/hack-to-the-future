"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from 'framer-motion';

function PDP1Computer() {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("pdp1ComputerCanvas"), // Correct ID
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 0);
      camera.position.z = 100;
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI * 0.5;
      controls.target.set(-3, 8, 0);
      controls.enablePan = false;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light
      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(0, 500, 500);
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);

      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      const canvasTexture = new THREE.CanvasTexture(canvas);

      let inputText = "";
      let cursorVisible = true;

      const updateCanvasText = () => {
        context.fillStyle = "#000000"; // Clear canvas
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#71CBF5"; // Text color
        context.font = "30px monospace";

        const lines = inputText.split("\n");
        const lineHeight = 40;
        lines.forEach((line, index) => {
          context.fillText(line, 20, 50 + index * lineHeight);
        });

        // Draw the cursor
        if (cursorVisible) {
          const currentLine = lines[lines.length - 1] || "";
          const cursorX = 20 + context.measureText(currentLine).width;
          const cursorY = 50 + (lines.length - 1) * lineHeight;
          context.fillRect(cursorX, cursorY - 25, 10, 30); // Cursor rectangle
        }

        canvasTexture.needsUpdate = true;
      };

      const gltfLoader = new GLTFLoader();
      gltfLoader.load("/assets/pdp-1_computer/scene.gltf", (gltfScene) => {
        const screenMesh = gltfScene.scene.getObjectByName("Object_39");
        if (screenMesh) {
          const planeGeometry = new THREE.PlaneGeometry(8, 8);
          const planeMaterial = new THREE.MeshBasicMaterial({
            map: canvasTexture,
            transparent: true,
          });
          const textPlane = new THREE.Mesh(planeGeometry, planeMaterial);
          textPlane.position.set(0.5, 9, 7.2);
          textPlane.rotation.set(0, 0.4, 0);
          textPlane.scale.set(1, 1, 1);

          scene.add(textPlane);
        }

        gltfScene.scene.rotation.y = Math.PI / 8;
        gltfScene.scene.position.y = 3;
        gltfScene.scene.scale.set(10, 10, 10);
        scene.add(gltfScene.scene);
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          inputText = inputText.slice(0, -1);
        } else if (event.key === "Enter") {
          inputText += "\n";
        } else if (event.key.length === 1) {
          inputText += event.key;
        }

        inputText = inputText.toUpperCase();
        if (inputText === 'PROGRAM HELLO\nPRINT *, "HELLO WORLD!"\nEND PROGRAM HELLO') {
          console.log('Successful Input');
        }

        updateCanvasText();
      });

      setInterval(() => {
        cursorVisible = !cursorVisible;
        updateCanvasText();
      }, 500); // Toggle cursor every 500ms

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }, []);

  // // Update canvas whenever inputText changes
  // useEffect(() => {
  //   updateCanvasText(inputText);
  // }, [inputText]);

  const [leftText, setLeftText] = useState(
    "Developed in 1959, The PDP-1 (Programmed Data Processor-1) was the first computer built in Digital Equipment Corporation's PDP series. The PDP-1 was the original computer for many major inventions, including the earliest video game 'Spacewar!', the text editor, the word processor, the interactive debugger, and the first computer chess program!  Just one year earlier, FORTRAN, the first high-level programming language, was developed by IBM. Fortran is best known for its applications in numeric and scientific computing, and became the base for many programming languages that followed."
  ); const [rightText, setRightText] = useState(
    "Here's how to print hello world in FORTRAN\n\nPROGRAM HELLO\nPRINT *, \"HELLO WORLD!\"\nEND PROGRAM HELLO"
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        id="pdp1ComputerCanvas"
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
        dangerouslySetInnerHTML={{ __html: rightText.replace(/\n/g, "<br />") }}
      />
    </div>
  );
}

export default PDP1Computer;
