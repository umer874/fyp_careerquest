// components/VacancyStatsChart.tsx  

import React from "react";  
import { Line } from "react-chartjs-2";  
import {  
  Chart as ChartJS,  
  LineElement,  
  PointElement,  
  LinearScale,  
  CategoryScale,  
  Legend,  
  Tooltip,  
} from "chart.js";  

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);  

const VacancyStatsChart: React.FC = () => {  
  const data = {  
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],  
    datasets: [  
      {  
        label: "Application Sent",  
        data: [40, 60, 70, 80, 60, 90, 80, 100, 85, 70],  
        borderColor: "blue",  
        borderWidth: 1,  
        fill: false,  
      },  
      {  
        label: "Interviews Scheduled",  
        data: [20, 30, 25, 40, 50, 45, 60, 55, 70, 65],  
        borderColor: "orange",  
        borderWidth: 2,  
        fill: false,  
      },  
      {  
        label: "Rejected",  
        data: [5, 10, 15, 12, 20, 25, 30, 32, 28, 20],  
        borderColor: "red",  
        borderWidth: 2,  
        fill: false,  
      },  
    ],  
  };  

  const options = {  
    responsive: true,  
    plugins: {  
      legend: {  
        position: "top" as const, // Using 'as const' for TypeScript compatibility  
      },  
      tooltip: {  
        mode: "index" as const,  
        intersect: false,  
      },  
    },  
    scales: {  
      y: {  
        beginAtZero: true,  
      },  
    },  
  };  

  return (  
    <div>  
      <h5>Vacancy Stats</h5>  
      <Line data={data} options={options} />  
    </div>  
  );  
};  

export default VacancyStatsChart;