"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Splash from "./components/splash";
import Main from "./components/main";
import Landing from "./components/landing";
import Head from 'next/head';


// imports the App component from the App.jsx file 
// ssr: false ensures that the component is not server-side rendered
const AppleMacintosh = dynamic(() => import('./components/AppleMacintosh'), { ssr: false });

export default function Home() {
  return (
    <>
    <Head>
      <link rel="icon" type="image/x-icon" size="32x32" href="/favicon.ico" />
    </Head>
    <div>
      <Landing />
    </div>

    </>
  );
}