"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./chart.module.css";

export default function LineChart({ time }: { time: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create custom tooltip element if not already present
    let tooltipEl = tooltipRef.current;
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = styles.tooltipBox;
      canvasRef.current.parentNode?.appendChild(tooltipEl);
      tooltipRef.current = tooltipEl;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Views",
            data: [37, 46, 55, 61, 64, 62, 56, 47, 37, 29, 24, 21, 22, 28, 37],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#4CAF50",
            pointBorderColor: "#4CAF50",
          },
          {
            label: "Important Points",
            data: [
              null,
              null,
              null,
              69,
              null,
              null,
              null,
              null,
              null,
              61,
              null,
              null,
              null,
              70,
              null,
            ],
            borderColor: "rgba(0,0,0,0)",
            backgroundColor: "rgba(255,0,0,0.5)",
            pointBackgroundColor: "red",
            pointBorderColor: "red",
            pointRadius: 4,
            type: "line",
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false, // Disable default
            external: function (context) {
              const { chart, tooltip } = context;
              const tooltipEl = tooltipRef.current;
              if (!tooltipEl) return;

              if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = "0";
                return;
              }

              const point = tooltip.dataPoints?.[0];
              if (!point) return;

              // Set tooltip content
              tooltipEl.innerHTML = `
    <div><strong>${point.dataset.label}</strong></div>
    <div>Value: ${point.formattedValue}</div>
    <div>Index: ${point.dataIndex}</div>
  `;

              // Use tooltip.x and tooltip.y instead of caretX/Y
              const canvasRect = chart.canvas.getBoundingClientRect();
              const mouseX = window.scrollX + tooltip.x;
              const mouseY = window.scrollY + tooltip.y;

              tooltipEl.style.left = `${mouseX}px`;
              tooltipEl.style.top = `${mouseY + 40}px`; // just 10px below the cursor
              tooltipEl.style.opacity = "1";
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#333", font: { size: 12 } },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#333", font: { size: 12 } },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      tooltipRef.current?.remove();
      tooltipRef.current = null;
    };
  }, [time]);

  return (
    <div className={styles.mainBox}>
      <div className={styles.subBox}>
        <canvas ref={canvasRef} className={styles.canvas} />
        {/* Tooltip is injected dynamically */}
      </div>
    </div>
  );
}
