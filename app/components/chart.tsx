'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function LineChart({time}:{time:number[]}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
            label: 'Views',
            data: [1,2,3,4,5,6,7,30, 45, 60, 40, 80],
            borderColor: '#116611',
            backgroundColor: 'rgba(17,102,16,0.1)',
            fill: true,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { beginAtZero: true,ticks:{color:"#000000"},grid:{color:"rgba(0,0,0,0.2)"} },
          y: { beginAtZero: true,ticks:{color:"#000000"},grid:{color:"rgba(0,0,0,0.2)"} },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  },[time]);

  return (
    <div className="flex-1">
      <div className="relative w-full h-[250px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}