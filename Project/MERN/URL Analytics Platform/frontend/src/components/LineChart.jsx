import { useEffect, useRef } from 'react';

// Thin wrapper around the global Chart.js instance loaded via CDN in index.html.
export default function LineChart({ labels, data, label = 'Clicks' }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return;

    chartRef.current?.destroy();
    chartRef.current = new window.Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13,148,136,0.12)',
            tension: 0.3,
            fill: true,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [labels, data, label]);

  return <canvas ref={canvasRef} height="220" />;
}
