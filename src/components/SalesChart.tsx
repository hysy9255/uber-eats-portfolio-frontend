// import { Chart as ChartJS } from "chart.js/auto";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const SalesChart = () => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Line
      data={{
        labels: ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Revenue",
            data: [200, 100, 400, 100, 250, 100, 500],
            backgroundColor: "rgba(153,204,255,0.15)", // <-- 투명한 채움
            borderColor: "#3366CC",
            fill: true,
          },
        ],
      }}
      options={options}
    />
  );
};

export default SalesChart;
