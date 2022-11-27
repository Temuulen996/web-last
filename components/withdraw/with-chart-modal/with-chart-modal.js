import PieChart from "../../charts/PieChart/pie-chart";

const WithChartModal = ({ hidden, setHidden, userId }) => {
  return (
    <div
      onClick={() => {
        setHidden(true);
      }}
      className={`w-[1840px] bg-gray-400  absolute left-10 right-10 h-[800px] top-10  bottom-10  ${
        hidden ? "hidden" : "absolute"
      }`}
    >
      <PieChart userId={userId} />
    </div>
  );
};

export default WithChartModal;
