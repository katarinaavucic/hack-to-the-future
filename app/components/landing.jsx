"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PDP1Computer from "./PDP1Computer"; 
import AppleMacintosh from "./AppleMacintosh";
import DesktopComputer from "./DesktopComputer";
import MacbookPro2021 from "./MacbookPro2021";
import SingleSpiralNotepad from "./SingleSpiralNotepad";
import "../crt.css"
import useSound from "use-sound";


const Splash = ({ isVisible, bounceComplete, activeIndex, play1800s, stop1800s }) => {
    const [moved, setMoved] = useState(false);
    
    const moveAndPlay = () => {
        document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' });
        if (!moved) {
            play1800s();
        }
        setMoved(true);
    }


    return (
        <div className={`h-screen flex flex-col items-center justify-between ${activeIndex === 4 ? 'text-gray-900' : 'text-white'}`}>
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
                    onClick={() => moveAndPlay()}
                    className="transition-transform hover:translate-y-1 cursor-pointer"
                    aria-label="Scroll to next section"
                >
                    <ChevronDown size={50} />
                </button>
            </div>
        </div>
    );
};

const Carousel = ({ items, activeIndex, updateIndex, play1800s, stop1800s, playing1800s, setPlaying1800s,
    eightSuccess, sixtiesSuccess, seventiesSuccess, millSuccess}) => {
    var [play1960s, { stop }] = useSound("Yellow_Submarine(inst).mp3", {volume: 0.25});
    const stop60s = stop;
    var [play1970s, { stop }] = useSound("Never_Gonna_Give_You_Up(inst).mp3", {volume: 0.5});
    const stop70s = stop;
    var [play2000s,{ stop }] = useSound("Bye_Bye_Bye(inst).mp3", {});
    const stop00s = stop;
    var [play2020s,{ stop }] = useSound("Too_Sweet(inst).mp3");
    const stop20s = stop;
    const [playing1960s, setPlaying1960s] = useState(false);
    const [playing1970s, setPlaying1970s] = useState(false);
    const [playing2000s, setPlaying2000s] = useState(false);
    const [playing2020s, setPlaying2020s] = useState(false);

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

    const backForthPlay = (forward) => {
        if (forward) {
            updateIndex(activeIndex + 1);
        } else{
            updateIndex(activeIndex - 1);
        }
        if (playing1800s) {
            stop1800s();
            setPlaying1800s(!playing1800s);
            if (forward) {
                play1960s();
                setPlaying1960s(!playing1960s);
            } 
        } else if (playing1960s) {
            stop60s();
            setPlaying1960s(!playing1960s);
            if (forward) {
                play1970s();
                setPlaying1970s(!playing1970s);
            } else {
                play1800s();
                setPlaying1800s(!playing1800s);
            }
        } else if (playing1970s) {
            stop70s();
            setPlaying1970s(!playing1970s);
            if (forward) {
                play2000s();
                setPlaying2000s(!playing2000s);
            } else {
                play1960s();
                setPlaying1960s(!playing1960s);
            }
        } else if (playing2000s) {
            stop00s();
            setPlaying2000s(!playing2000s);
            if (forward) {
                play2020s();
                setPlaying2020s(!playing2020s);
            } else {
                play1970s();
                setPlaying1970s(!playing1970s);
            }
        } else if (playing2020s) {
            stop20s();
            setPlaying2020s(!playing2020s);
            if (!forward) {
                play2000s();
                setPlaying2000s(!playing2000s);
            }
        }
    }

    return (
        <div id="carousel" className="crt-filter relative h-screen flex flex-col justify-center items-center text-white">
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
                        className={`button-arrow px-4 py-2`}
                        onClick={() => backForthPlay(false)}
                        disabled={activeIndex === 0}
                    >
                        <span className={`button-arrow material-symbols-outlined ${
                            activeIndex === 0 ? 'text-gray-300' : 
                            activeIndex === items.length - 1 ? 'text-gray-900' : 
                            'text-white'
                        }`}>
                            ← Prev Decade
                        </span>
                    </button>
                    {((activeIndex === 0 && eightSuccess) ||
                      (activeIndex === 1 && sixtiesSuccess) ||
                      (activeIndex === 2 && seventiesSuccess) ||
                      (activeIndex === 3 && millSuccess) || 
                      (activeIndex === 4)) && (
                        <button
                            className={`button-arrow px-4 py-2 ${activeIndex >= items.length - 1 ? "text-gray-300 cursor-default" : "text-white"}`}
                            onClick={() => backForthPlay(true)}
                            disabled={activeIndex >= items.length - 1}
                        >
                            <span className={`button-arrow material-symbols-outlined ${activeIndex >= items.length - 1 ? 'text-gray-300' : 'text-white'}`}>
                                Next Decade →
                            </span>
                        </button>
                    )}
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
    const [play1800s, { stop }] = useSound("/Fur_Elise.mp3");
    const [playing1800s, setPlaying1800s] = useState(true);

    const [eightSuccess, setEightSuccess] = useState(false);
    const [sixtiesSuccess, setSixtiesSuccess] = useState(false);
    const [seventiesSuccess, setSeventiesSuccess] = useState(false);
    const [millSuccess, setMillSuccess] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setBounceComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const items = [
        { id: 1, title: "Prelude", description: "Prelude is a decade", component: <SingleSpiralNotepad setEightSuccess={setEightSuccess}/>, color:"#18181b" },
        { id: 2, title: "60s", description: "60s decade", component: <PDP1Computer setSixtiesSuccess={setSixtiesSuccess} />, color:"#F28D8D" },
        { id: 3, title: "70s", description: "70s decade", component: <AppleMacintosh setSeventiesSuccess={setSeventiesSuccess} />, color:"#FF6C2E" },
        { id: 4, title: "00s", description: "00s decade", component: <DesktopComputer setMillSuccess={setMillSuccess} />, color:"#497EA8" },
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
        <div className="crt-filter overflow-y-hidden snap-y snap-mandatory h-screen" style={{ backgroundColor: bgColor, transition: "all .3s ease" }}>
            <div id="splash" className="snap-start">
                <Splash isVisible={isVisible} bounceComplete={bounceComplete} activeIndex={activeIndex} play1800s={play1800s} stop1800s={stop} />
            </div>
            <div className="snap-start">
                <Carousel items={items} activeIndex={activeIndex} updateIndex={updateIndex} play1800s={play1800s} stop1800s={stop} 
                playing1800s={playing1800s} setPlaying1800s={setPlaying1800s} eightSuccess={eightSuccess} sixtiesSuccess={sixtiesSuccess}
                seventiesSuccess={seventiesSuccess} millSuccess={millSuccess}/>
            </div>
        </div>
    );
}
