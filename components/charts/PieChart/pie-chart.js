// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Spinner from "../../spinner/spinner";
const labels = ["цалин", "нэмэлт орлого", "бусад"];

const PieChart = ({ userId, list }) => {
  const [myData, setMyData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //   const fetchData = async () => {
  //

  //     lists = await lists.json();
  //     setMyData(lists);
  //   };
  useEffect(() => {
    setLoading(true);
    // fetch(`/api/with-list/${userId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    let daaataaa = [0, 0, 0];
    list.map((el, i) => {
      if (el.category === "цалин") {
        daaataaa[0] = daaataaa[0] + el.value;
      } else if (el.category === "бусад") {
        daaataaa[2] = daaataaa[2] + el.value;
      } else if (el.category === "нэмэлт") {
        daaataaa[1] = daaataaa[1] + el.value;
      }
    });
    setMyData(daaataaa);
    setLoading(false);
    //   });
  }, [list]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "орлого",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
        data: myData,
      },
    ],
  };
  if (isLoading) return <Spinner />;
  if (!data) return <p>No data</p>;

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Pie data={data} height={150} />
    </div>
  );
};
export default PieChart;
