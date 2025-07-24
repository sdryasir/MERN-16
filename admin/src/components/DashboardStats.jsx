import React from 'react';

const DashboardStats = () => {
  const stats = [
    {
      icon: 'fa-chart-line',
      label: 'Today Sale',
      value: '$1234',
    },
    {
      icon: 'fa-chart-bar',
      label: 'Total Sale',
      value: '$1234',
    },
    {
      icon: 'fa-chart-area',
      label: 'Today Revenue',
      value: '$1234',
    },
    {
      icon: 'fa-chart-pie',
      label: 'Total Revenue',
      value: '$1234',
    },
  ];

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {stats.map((item, idx) => (
          <div className="col-sm-6 col-xl-3" key={idx}>
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className={`fa ${item.icon} fa-3x text-primary`}></i>
              <div className="ms-3">
                <p className="mb-2">{item.label}</p>
                <h6 className="mb-0">{item.value}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
