"use client";
import React, { useState } from "react";
import PDP1Computer from "./PDP1Computer"; 
import AppleMacintosh from "./AppleMacintosh";
import DesktopComputer from "./DesktopComputer";
import MacbookPro2021 from "./MacbookPro2021";
import SingleSpiralNotepad from "./SingleSpiralNotepad";

export default function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#5B5358");

  const items = [
    { id: 1, title: "Prelude", description: "Prelude is a decade", component: <SingleSpiralNotepad />, color:"#5B5358" },
    { id: 2, title: "60s", description: "60s decade", component: <PDP1Computer />, color:"#F28D8D" },
    { id: 3, title: "70s", description: "70s decade", component: <AppleMacintosh />, color:"#FF6C2E" },
    { id: 4, title: "00s", description: "00s decade", component: <DesktopComputer />, color:"#497EA8" },
    { id: 5, title: "20s", description: "20s decade", component: <MacbookPro2021 />, color:"#FFF9ED" },
  ];

  // Component for individual carousel items
  const CarouselItem = ({ item, width }) => {
    return (
      <div className="carousel-item flex-shrink-0 flex flex-col items-center justify-center min-h-screen" style={{ width }}>
        <div className="carousel-component object-contain mx-auto" style={{ transform: 'scale(0.9)', position: 'relative', width: '100%', height: '100%' }}>
          {item.component}
        </div>
        <div className="text-white carousel-item-text text-center mt-4">
          {item.description}
        </div>
      </div>
    );
  };

  // Function to update the active index and background color
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
    setBgColor(items[newIndex].color);
  };

  return (
    <div className="carousel overflow-hidden relative" 
    style={{ backgroundColor: bgColor, transition: "all .3s ease" }}>
      <div
        className="inner flex transition-transform duration-300"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} width="100%" />
        ))}
      </div>
      

      {/* Carousel Buttons */}
      <div className="absolute bottom-12 w-full pl-20 pr-20 carousel-buttons flex justify-between items-center">
        <button
          className={`button-arrow ${activeIndex === 0 ? 'text-gray-300 cursor-default' : 'text-white'}`}
          onClick={() => updateIndex(activeIndex - 1)}
        >
          <span className={`button-arrow material-symbols-outlined ${activeIndex === 0 ? 'text-gray-300' : 'text-white'}`}> ←	Prev Decade</span>
        </button>

        <button
          className={`button-arrow ${activeIndex >= items.length - 1 ? "text-gray-300 cursor-default" : "text-white"}`}
          onClick={() => updateIndex(activeIndex + 1)}
        >
          <span className={`button-arrow material-symbols-outlined ${activeIndex >= items.length - 1 ? 'text-gray-300' : 'text-white'}`}>Next Decade → </span>
        </button>
      </div>
    </div>
  );
}
