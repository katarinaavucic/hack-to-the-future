"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Splash from "./components/splash";
import Main from "./components/main";
import Landing from "./components/landing";

// imports the App component from the App.jsx file 
// ssr: false ensures that the component is not server-side rendered
const AppleMacintosh = dynamic(() => import('./components/DesktopComputer'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* <Splash />
      <Main /> */}
      <Landing />

    </>
  );
}