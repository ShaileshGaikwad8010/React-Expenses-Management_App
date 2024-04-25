import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ expensesDataPoints, savingsDataPoints }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy any existing chart to prevent memory leaks
    if (window.myChart !== undefined) {
      window.myChart.destroy();
    }

    // Create a new chart
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: expensesDataPoints.map(dataPoint => dataPoint.label),
        datasets: [
          {
            label: 'Expenses',
            data: expensesDataPoints.map(dataPoint => dataPoint.value),
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color for expenses
            borderColor: 'rgba(54, 162, 235, 1)', // Border color for expenses
            borderWidth: 1
          },
          {
            label: 'Savings',
            data: savingsDataPoints.map(dataPoint => dataPoint.value),
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color for savings
            borderColor: 'rgba(255, 99, 132, 1)', // Border color for savings
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white' // Set y-axis label color to white
            }
          },
          x: {
            ticks: {
              color: 'white' // Set x-axis label color to white
            }
          }
        }
    }
    });

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (window.myChart !== undefined) {
        window.myChart.destroy();
      }
    };
  }, [expensesDataPoints, savingsDataPoints]);

  return <> <h1>Bar Graph For Expenses And Savings</h1><canvas ref={chartRef} />;</>
};

export default ChartComponent;
