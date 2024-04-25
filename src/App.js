import { useState } from "react";
import './App.css'
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

import React, { useEffect, useRef } from 'react';
const EXPENSES = [
  
];



function App() {

  const [expenses, setExpenses] = useState(EXPENSES);

  const handleAddExpense = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    });
  };

  const vantabgRef = useRef(null);

  useEffect(() => {
    // Load Vanta.js library scripts
    const vantaScript = document.createElement('script');
    vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    document.body.appendChild(vantaScript);

    const birdsScript = document.createElement('script');
    birdsScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
    document.body.appendChild(birdsScript);

    // Initialize Vanta.js Birds effect
    vantaScript.onload = birdsScript.onload = () => {
      if (window.VANTA) {
        window.VANTA.BIRDS({
          el: vantabgRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 0.6,
          scaleMobile: 1.00
        });
      }
    };

    // Cleanup function to remove script elements
    return () => {
      document.body.removeChild(vantaScript);
      document.body.removeChild(birdsScript);
      if (window.VANTA) {
        window.VANTA.terminateAll();
      }
    };
  }, []);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div ref={vantabgRef} style={{height:'100%'}} className="vantabg">
      <h1>Expenses Management</h1>
      <NewExpense
        onAddExpense={handleAddExpense}
      />
      <Expenses
        items={expenses}
        monthNames={monthNames}
      />
    </div>
  );
}

export default App;
