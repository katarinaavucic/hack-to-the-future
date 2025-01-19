"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PDP1Computer from "./PDP1Computer"; 
import AppleMacintosh from "./AppleMacintosh";
import DesktopComputer from "./DesktopComputer";
import MacbookPro2021 from "./MacbookPro2021";
import SingleSpiralNotepad from "./SingleSpiralNotepad";
import "../crt.css"
const Splash = ({ isVisible, bounceComplete, activeIndex }) => {
    return (
        <div className={`crt-filter h-screen flex flex-col items-center justify-between text-white ${activeIndex === 4 ? 'text-gray-900' : 'text-white'}`}>
            {/* <div className={`p-3 transition-all duration-200 justify-center items-center flex font-mono text-sm ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <ul className="list-none">
                    <li>Anushka, Cici, Katarina, Tyler</li>
                </ul>
            </div>
            <div className={`transition-all duration-200 justify-center items-center flex font-mono text-sm ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <ul className="list-none">
                    <li className="">UofT Hacks 12</li>
                </ul>
            </div> */}
            <div className={`overflow-hidden mt-8 pt-16 transition-all duration-1000 ease-out content-center flex justify-center items-center ${isVisible ? "animate-bounce-then-wobble" : "opacity-0"} ${!bounceComplete ? "animate-bounceOnce" : "animate-wobbleForever"}`}>
                <img className="scale-85" src="/HACK-TO-the-FUTURE.png" alt="logo" />
            </div>
            <div className={`pb-8 text-white text-center font-sans text-2xl mt-8 transition-all duration-1000 ease-out content-center flex justify-center items-center ${isVisible ? "animate-bounce-then-wobble" : "opacity-0"} ${!bounceComplete ? "animate-bounceOnce" : "animate-wobbleForever"}`}>
                <h1>Code your way from the past to the future!</h1>
            </div>
            <div className="w-full flex justify-between items-center pl-20 pr-20 text-sm">
                <a href="https://github.com/katarinaavucic/hack-to-the-future" className="cursor-pointer hover:italic">
                    How It Was Made
                </a>
                <a href="/attributions" className="cursor-pointer hover:italic">
                    Attributions
                </a>
            </div>
            <div className="mb-8">
                <button
                    onClick={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })}
                    className="transition-transform hover:translate-y-1 cursor-pointer"
                    aria-label="Scroll to next section"
                >
                    <ChevronDown size={50} />
                </button>
            </div>
        </div>
    );
};

const Carousel = ({ items, activeIndex, updateIndex }) => {
    const CarouselItem = ({ item, width }) => {
        return (
            <div className="carousel-item flex-shrink-0 flex flex-col items-center justify-center min-h-screen w-full">
                <div className="carousel-component object-contain mx-auto" style={{ transform: 'scale(0.9)', position: 'relative', width: '100%', height: '100%' }}>
                    {item.component}
                </div>
                <div className="text-white carousel-item-text text-center mt-4">{item.description}</div>
            </div>
        );
    };

    return (
        <div id="carousel" className="hsv-filter relative h-screen flex flex-col justify-center items-center text-white">
            <div className="mt-8">
                <button
                    onClick={() => document.getElementById('splash').scrollIntoView({ behavior: 'smooth' })}
                    className={`transition-transform hover:translate-y-1 cursor-pointer ${activeIndex === items.length - 1 ? 'text-gray-900' : 'text-white'}`}
                    aria-label="Scroll to next section"
                >
                    <ChevronUp size={50} />
                </button>
            </div>
            <div className="carousel overflow-hidden relative flex-grow w-full">
                <div
                    className="inner flex transition-transform duration-300"
                    style={{ transform: `translate(-${activeIndex * 100}%)` }}
                >
                    {items.map((item) => (
                        <CarouselItem key={item.id} item={item} width="100%" />
                    ))}
                </div>
                <div className="absolute bottom-12 left-0 right-0 px-20 flex justify-between items-center z-50 pointer-events-auto">
                    <button
                        className={`button-arrow px-4 py-2 ${activeIndex === 0 ? 'text-gray-300 cursor-default' : 'text-white'}`}
                        onClick={() => updateIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                    >
                        <span className={`button-arrow material-symbols-outlined ${activeIndex === 0 ? 'text-gray-300' : 'text-white'}
                        ${activeIndex === items.length - 1 ? 'text-gray-900' : 'text-white'}`}>
                            ← Prev Decade
                        </span>
                    </button>
                    <button
                        className={`button-arrow px-4 py-2 ${activeIndex >= items.length - 1 ? "text-gray-300 cursor-default" : "text-white"}`}
                        onClick={() => updateIndex(activeIndex + 1)}
                        disabled={activeIndex >= items.length - 1}
                    >
                        <span className={`button-arrow material-symbols-outlined ${activeIndex >= items.length - 1 ? 'text-gray-300' : 'text-white'}`}>
                            Next Decade →
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Landing() {
    const [isVisible, setIsVisible] = useState(false);
    const [bounceComplete, setBounceComplete] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [bgColor, setBgColor] = useState("#18181b");

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setBounceComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const items = [
        { id: 1, title: "Prelude", description: "Prelude is a decade", component: <SingleSpiralNotepad />, color:"#5B5358" },
        { id: 2, title: "60s", description: "60s decade", component: <PDP1Computer />, color:"#F28D8D" },
        { id: 3, title: "70s", description: "70s decade", component: <AppleMacintosh />, color:"#FF6C2E" },
        { id: 4, title: "00s", description: "00s decade", component: <DesktopComputer />, color:"#497EA8" },
        { id: 5, title: "20s", description: "20s decade", component: <MacbookPro2021 />, color:"#FFF9ED" },
    ];

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
        <div className="overflow-y-hidden snap-y snap-mandatory h-screen" style={{ backgroundColor: bgColor, transition: "all .3s ease" }}>
            <div id="splash" className="snap-start">
                <Splash isVisible={isVisible} bounceComplete={bounceComplete} activeIndex={activeIndex} />
            </div>
            <div className="snap-start">
                <Carousel items={items} activeIndex={activeIndex} updateIndex={updateIndex} />
            </div>
        </div>
    );
}
