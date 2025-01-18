"use client";
import React, { useState } from "react";
import { ChevronUp, CircleArrowLeft, CircleArrowRight, Circle, Lock } from "lucide-react";
export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel items
  const items = [
    {
      id: 1,
      title: "Apple 1",
      description: "This is the Apple 1. This is where most devs learned BASIC. Try typing in the code editor.",
      image: "/imgs/laptop.png",
      label: "50s",
    },
    {
      id: 2,
      title: "Apple 2",
      description: "This is the Apple 2. It introduced even more features!",
      image: "/imgs/laptop2.png",
      label: "60s",
    },
    {
      id: 3,
      title: "Apple 3",
      description: "This is the Apple3. It introduced even more features!",
      image: "/imgs/laptop3.png",
      label: "70s",
    },
  ];

  // Update the active slide index
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = items.length - 1; // Loop to the last slide
    } else if (newIndex >= items.length) {
      newIndex = 0; // Loop back to the first slide
    }
    setActiveIndex(newIndex);
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", padding: "20px", textAlign: "center" }}>
      {/* Top Arrow */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <ChevronUp size={50} color="#fff" />
      </div>

      {/* Carousel Content */}
      <div className="carousel" style={{ position: "relative", overflow: "hidden", width: "100%" }}>
        <div
          className="inner"
          style={{
            display: "flex",
            transform: `translateX(-${activeIndex * 50}%)`,
            transition: "transform 0.5s ease-in-out",
            width: `${items.length * 100}%`,
          }}
        >
          {items.map((item) => (
            // <CarouselItem key={item.id} item={item} width="100%" />
            <div
              key={item.id}
              style={{
                width: "100%",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                backgroundColor: "#333",
              }}
            >
              <img
                src={items[activeIndex].image}
                alt={items[activeIndex].title}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "fill",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Description */}
      <div style={{ marginTop: "20px", fontSize: "16px" }}>
        <p>{items[activeIndex].description}</p>
      </div>

      {/* Navigation Buttons */}
      <div
        className="carousel-buttons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          className="button-arrow"
          onClick={() => updateIndex(activeIndex - 1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CircleArrowLeft size={48} color="#fff" />
        </button>

        {/* Indicators and Lock */}
<div
  className="indicators"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px", // Space between circles and lock
  }}
>
  <div style={{ display: "flex", gap: "10px" }}>
    {items.map((item, index) => (
      <button
        key={index}
        onClick={() => updateIndex(index)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        {index === activeIndex ? (
          <Circle size={24} color="#fff" fill="#fff" />
        ) : (
          <Circle size={24} color="#666" />
        )}
        <p style={{ marginTop: "5px", color: "#fff" }}>{item.label}</p>
      </button>
    ))}
  </div>
  <Lock size={24} color="#666" />
</div>

        <button
          className="button-arrow"
          onClick={() => updateIndex(activeIndex + 1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CircleArrowRight size={48} color="#fff" />
        </button>
      </div>
    </div>
    
  );
};
