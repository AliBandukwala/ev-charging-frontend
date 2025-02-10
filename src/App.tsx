import SimulationForm from "./components/SimulationForm";
import SimulationResults from "./components/SimulationResults";
import { Provider } from "react-redux";
import { store } from "./stores/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col lg:flex-row lg:items-start p-6 bg-gray-100 min-h-screen">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 lg:max-w-1xl lg:mr-3 bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">EV Charging Simulation</h1>
          <SimulationForm />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 mt-6 lg:mt-0 w-full max-w-6xl">
          <SimulationResults />
        </div>
      </div>
    </Provider>
  );
}

export default App;
