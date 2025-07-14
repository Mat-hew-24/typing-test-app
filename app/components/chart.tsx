"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./chart.module.css";

type chartProp = {
  time: number[];
  chartWpm: Array<number>;
  chartRaw: Array<number>;
  theme: string;
  noop: (x: unknown) => void;
  mistake: Array<number>;
};

export default function LineChart({
  time,
  chartRaw,
  chartWpm,
  theme,
  noop,
  mistake,
}: chartProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const img = new Image();
  img.src = "/RED-CROSS.png"; // public path or imported image src

  //CHART TICKS COLOR
  useEffect(() => {
    const chartVal = chartRef.current;
    if (
      !chartVal ||
      !chartVal.options?.scales?.x?.ticks ||
      !chartVal.options?.scales?.y?.ticks ||
      !chartVal.options?.scales?.y1?.ticks
    )
      return;

    const tickX = chartVal.options?.scales?.x?.ticks;
    const tickY = chartVal.options?.scales?.y?.ticks;
    const tickY1 = chartVal.options?.scales?.y1?.ticks;

    if (tickX && tickY && tickY1) {
      const colorToggle = theme === "light" ? "#000" : "#fff";
      tickX.color = colorToggle;
      tickY.color = colorToggle;
      tickY1.color = colorToggle;
      try {
        chartVal.update("none");
      } catch {
        console.warn("ERR");
      }
    }
  }, [theme, chartRef.current]);
  //

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
            label: "raw",
            data: chartRaw.map((a) => (a >= 0 ? a : 0)),
            borderColor: "#d09f00",
            backgroundColor: "rgba(169, 4, 254, 0.1)",
            fill: false,
            tension: 0.5,
            pointRadius: 2,
            pointBackgroundColor: "#4cff50",
            pointBorderColor: "#4cff50",
          },
          {
            label: "wpm",
            data: chartWpm,
            borderColor: "rgba(169, 4, 254, 0.5)",
            backgroundColor: "rgba(169, 4, 254, 0.1)",
            fill: true,
            tension: 0.5,
            pointRadius: 2,
            pointBackgroundColor: "rgba(169, 4, 254, 0.8)",
            pointBorderColor: "rgba(169, 4, 254, 0.8)",
          },
          {
            label: "mistake",
            data: mistake.map((item) => (item ? item : null)),
            yAxisID: "y1",
            showLine: false,
            pointRadius: 0.1,
            pointStyle: img, // 👈 image here
            pointBackgroundColor: "transparent", // optional
            pointBorderColor: "transparent", // optional
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
              noop(chart);
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
            ticks: {
              color: theme === "light" ? "#000" : "#fff",
              font: { size: 12 },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: theme === "light" ? "#000" : "#fff",
              font: { size: 12 },
            },
            grid: { display: false },
          },
          y1: {
            position: "right",
            min: 0,
            max: Math.max(...mistake) + 1,
            beginAtZero: true,
            ticks: {
              color: theme === "light" ? "#000" : "#fff",
              font: { size: 12 },
              callback: (value: string | number) => Number(value).toFixed(0),
              maxTicksLimit: 5,
            },
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
        {}
      </div>
    </div>
  );
}
