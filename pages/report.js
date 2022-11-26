import { CChart } from "@coreui/react-chartjs";
import Layout from "../components/layout/layout";
import CardLineChart from "../components/line-chart/line-chart";

const Report = () => {
  return (
    <Layout>
      <div className="w-2/3 ">
        <CardLineChart />
      </div>
    </Layout>
  );
};

export default Report;
