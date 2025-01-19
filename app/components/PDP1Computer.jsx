"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function PDP1Computer({ setSixtiesSuccess }) {
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

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

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
        console.log(inputText);

        inputText = inputText.toUpperCase();
        if (inputText === 'PROGRAM HELLO\nPRINT *, "HELLO WORLD!"\nEND PROGRAM HELLO') {
          console.log("Success!");
          setSixtiesSuccess(true); 
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

  return (
    <div>
      <canvas id="pdp1ComputerCanvas" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default PDP1Computer;
