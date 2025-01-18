"use client"
import React from 'react';
import dynamic from 'next/dynamic';

// imports the App component from the App.jsx file 
// ssr: false ensures that the component is not server-side rendered
const AppleMacintosh = dynamic(() => import('./components/PDP1Computer'), { ssr: false });

export default function HomePage() {
  return (
    <React.StrictMode>
      <AppleMacintosh />
    </React.StrictMode>
  );
}