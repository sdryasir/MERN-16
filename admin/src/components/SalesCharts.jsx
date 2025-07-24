import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesCharts = () => {
  const worldwideSalesRef = useRef(null);
  const salesRevenueRef = useRef(null);

  useEffect(() => {
    // Worldwide Sales Chart
    const worldwideChart = new Chart(worldwideSalesRef.current, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Worldwide Sales',
          data: [120, 190, 300, 250, 200, 300],
          backgroundColor: 'rgba(239, 6, 6, 0.6)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    // Sales & Revenue Chart
    const salesRevenueChart = new Chart(salesRevenueRef.current, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [100, 150, 250, 300, 280, 320],
          borderColor: 'rgba(5, 251, 17, 1)',
          fill: false,
        }, {
          label: 'Revenue',
          data: [80, 130, 200, 250, 270, 300],
          borderColor: 'rgba(228, 3, 3, 1)',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    // Cleanup charts on component unmount
    return () => {
      worldwideChart.destroy();
      salesRevenueChart.destroy();
    };
  }, []);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="#">Show All</a>
            </div>
            <div style={{ height: '300px' }}>
              <canvas ref={worldwideSalesRef}></canvas>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="#">Show All</a>
            </div>
            <div style={{ height: '300px' }}>
              <canvas ref={salesRevenueRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;
