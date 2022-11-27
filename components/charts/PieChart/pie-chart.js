// ./components/PieChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
const labels = ["цалин", "нэмэлт орлого", "бусад"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(0,0,255)",
      data: [10000, 10, 5],
    },
  ],
};
const PieChart = () => {
  return (
    <div className="w-full h-full">
      <Pie data={data} />
    </div>
  );
};
export default PieChart;
