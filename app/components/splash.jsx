'use client';

import {React, useState, useEffect} from "react"; 
import { ChevronDown } from "lucide-react";

const Splash = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [bounceComplete, setBounceComplete] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
      
    useEffect(() => {
        setIsVisible(true);
        // Wait for bounce animation to complete before starting wobble
        const timer = setTimeout(() => {
            setBounceComplete(true);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <><div className={`w-full h-full p-2 transition-all duration-200 justify-center items-center flex font-mono text-white text-sm ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <ui className="list-none">
                <li>Anushka, Cici, Katarina, Tyler</li>
            </ui>
        </div>
        <div className={`transition-all duration-200 justify-center items-center flex font-mono text-white text-sm ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <ui className="list-none">
                <li className="">UofT Hacks 12</li>
            </ui>
        </div>
        <div className={`overflow-hidden mt-8 pt-16 transition-all duration-1000 ease-out content-center flex justify-center items-center ${isVisible ? "animate-bounce-then-wobble" : "opacity-0"} ${!bounceComplete? "animate-bounceOnce" : "animate-wobbleForever"}`}>
            <img className="scale-85" src="/HACK-TO-the-FUTURE.png" alt="logo" />
        </div>
        <div className="pb-8 text-white text-center font-sans text-2xl mt-8">
            <h1>Code your way from the past to the future!</h1>
        </div>
        <div className="absolute p-4 left-1/2 transform -translate-x-1/2 text-white">
            <button 
                onClick={() => "#id_TBF"}
                className="transition-transform hover:translate-y-1 cursor-pointer"
                aria-label="Scroll to next section"
            >
                <ChevronDown size={50} />
            </button>
        </div>
        <footer className="w-full flex justify-between items-center p-4 text-white text-sm">
            <a href="https://github.com/katarinaavucic/hack-to-the-future" className="cursor-pointer hover:italic">
                How It Was Made
            </a>
            {/* TODO: add attribution link here */} 
            <a href="/attributions" className="cursor-pointer hover:italic">
                Attributions
            </a>
        </footer>
        </>
    );
}

export default Splash;