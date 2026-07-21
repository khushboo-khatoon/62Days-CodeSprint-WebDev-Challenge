import { useEffect, useRef } from 'react';

const PALETTE = ['#0d9488', '#14b8a6', '#5eead4', '#0891b2', '#0e7490', '#134e4a'];

export default function BarChart({ labels, data, horizontal = false }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return;

    chartRef.current?.destroy();
    chartRef.current = new window.Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map((_, i) => PALETTE[i % PALETTE.length]),
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [labels, data, horizontal]);

  return <canvas ref={canvasRef} height="220" />;
}
