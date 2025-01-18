"use client";
import React, { useState } from "react";
import { ChevronUp } from "lucide-react";

export default function Main() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { id: 1, title: "Prelude", description: "Prelude is a decade", icon: "../favicon.ico" },
    { id: 2, title: "60s", description: "60s decade", icon: "../favicon.ico" },
    { id: 3, title: "70s", description: "70s decade", icon: "../favicon.ico" },
    { id: 4, title: "00s", description: "00s decade", icon: "../favicon.ico" },
    { id: 5, title: "20s", description: "20s decade", icon: "../favicon.ico" },
  ];

  // Component for individual carousel items
  const CarouselItem = ({ item, width }) => {
    return (
      <div className="carousel-item flex-shrink-0 flex flex-col items-center justify-center min-h-screen" style={{ width }}>
        <div></div>
        <img 
          className="carousel-img w-64 h-64 object-contain mx-auto" 
          src={item.icon} 
          alt={item.title} 
        />
        <div className="text-white carousel-item-text text-center mt-4">{item.description}</div>
      </div>
    );
  };

  // Function to update the active index
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel overflow-hidden relative">

    <div className="absolute left-1/2 transform -translate-x-1/2 text-white">
            <button 
                onClick={() => "#id_TBF"}
                className="transition-transform hover:translate-y-1 cursor-pointer"
                aria-label="Scroll to next section"
            >
                <ChevronUp size={50} />
            </button>
        </div>
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
