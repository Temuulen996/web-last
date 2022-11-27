// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Spinner from "../../spinner/spinner";
const labels = ["орлого", "зарлага"];

const PieChartReport = ({ withlists, userId, depolists }) => {
  const [isLoading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);
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
    let daaataaa = [0, 0];
    withlists.map((el, i) => {
      daaataaa[0] = daaataaa[0] + el.value;
    });
    depolists.map((el, i) => {
      daaataaa[1] = daaataaa[1] + el.value;
    });
    console.log(daaataaa);
    setMyData(daaataaa);
    setLoading(false);
    //   });
  }, []);
  console.log(myData[1]);
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
    <div className="w-full h-[400px] md:h-[550px] flex justify-center items-center">
      <Pie data={data} height={150} />
    </div>
  );
};
export default PieChartReport;
