import { getCookie } from "cookies-next";
import LineChartReport from "../components/charts/line-chart/line-chart-report";
import PieChartReport from "../components/charts/PieChart/pie-chart-report";
import Layout from "../components/layout/layout";
// import CardLineChart from "../components/line-chart/line-chart";
export const getServerSideProps = async (req, res) => {
  const userId = getCookie("userId", req, res);
  console.log(userId);
  let withlists = await fetch(`http://localhost:3000/api/with-list/${userId}`);
  withlists = await withlists.json();
  let depolists = await fetch(`http://localhost:3000/api/depo-list/${userId}`);
  depolists = await depolists.json();
  return {
    props: {
      depolists: depolists.length === 0 ? [] : depolists,
      withlists: withlists.length === 0 ? [] : withlists,
      userId: userId,
    },
  };
};
const Report = ({ withlists, userId, depolists }) => {
  console.log(withlists);
  console.log(depolists);
  return (
    <Layout>
      <div className="w-2/3 ">
        {/* <CardLineChart /> */}
        <LineChartReport
          withlists={withlists}
          depolists={depolists}
          userId={userId}
        />
        <PieChartReport
          withlists={withlists}
          depolists={depolists}
          userId={userId}
        />
      </div>
    </Layout>
  );
};

export default Report;
