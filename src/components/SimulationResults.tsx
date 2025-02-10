import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const SimulationResults = () => {
  const { chargePointTypes } = useSelector((state: RootState) => state.simulation);

  // Compute total power demand
  const totalPower = chargePointTypes.reduce((sum, cp) => sum + cp.quantity * cp.power, 0);

  // Compute average charging power per charge-point
  const avgPowerPerChargePoint = chargePointTypes.map(cp => ({
    label: `${cp.power} kW Charger`,
    value: cp.power / 3, // Assuming power is averaged over 3 sessions per day
  }));

  // Compute total energy charged (kWh)
  const totalEnergy = chargePointTypes.reduce((sum, cp) => sum + cp.quantity * cp.power * 3 * 2, 0); // 3 sessions/day, 2 hours/session

  // Simulated charging events per day/week/month/year
  const chargingEvents = {
    daily: chargePointTypes.reduce((sum, cp) => sum + cp.quantity * 3, 0),
    weekly: chargePointTypes.reduce((sum, cp) => sum + cp.quantity * 3 * 7, 0),
    monthly: chargePointTypes.reduce((sum, cp) => sum + cp.quantity * 3 * 30, 0),
    yearly: chargePointTypes.reduce((sum, cp) => sum + cp.quantity * 3 * 365, 0),
  };

  // Bar Chart Data for Aggregated Charging Power Per Charge-Point
  const chargingPowerChartData = {
    labels: avgPowerPerChargePoint.map(cp => cp.label),
    datasets: [
      {
        label: "Avg Charging Power per Charge Point (kW)",
        data: avgPowerPerChargePoint.map(cp => cp.value),
        backgroundColor: ["#1abc9c", "#f39c12", "#e74c3c"],
      },
    ],
  };

  // Bar Chart Data for Total Energy Charged
  const energyChartData = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [
      {
        label: "Total Energy Charged (kWh)",
        data: [totalEnergy, totalEnergy * 7, totalEnergy * 30, totalEnergy * 365],
        backgroundColor: ["#9b59b6", "#8e44ad", "#6c3483", "#4a235a"],
      },
    ],
  };

  // Line Chart for Charging Events Over Time
  const chargingEventsData = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [
      {
        label: "Charging Events",
        data: [chargingEvents.daily, chargingEvents.weekly, chargingEvents.monthly, chargingEvents.yearly],
        borderColor: "#f39c12",
        backgroundColor: "rgba(243, 156, 18, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Line Chart for Exemplary Day
  const exemplaryDayData = {
    labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
    datasets: [
      {
        label: "Charging Demand (kW)",
        data: [
          totalPower * 0.2, // Nighttime (low demand)
          totalPower * 0.5, // Morning rush
          totalPower * 0.3, // Noon dip
          totalPower * 0.8, // Evening peak
          totalPower * 0.4, // Late night wind-down
        ],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Bar Chart: Charging Power Per Charge-Point */}
      <div className="p-4 bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2">Charging Values Per Charge-Point</h3>
        <Bar data={chargingPowerChartData} />
      </div>

      {/* Line Chart: Exemplary Day */}
      <div className="p-4 bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2">Charging Demand Over an Exemplary Day</h3>
        <Line data={exemplaryDayData} />
      </div>

      {/* Bar Chart: Total Energy Charged */}
      <div className="p-4 bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2">Total Energy Charged (kWh)</h3>
        <Bar data={energyChartData} />
      </div>

      {/* Line Chart: Charging Events */}
      <div className="p-4 bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2">Charging Events Over Time</h3>
        <Line data={chargingEventsData} />
      </div>
    </div>
  );
};

export default SimulationResults;
