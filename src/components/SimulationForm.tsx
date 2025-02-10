import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { updateChargePoints, updateSimulationParams } from "../stores/simulationSlice";

const SimulationForm = () => {
  const dispatch = useDispatch();
  const { chargePointTypes, arrivalMultiplier, consumption } = useSelector(
    (state: RootState) => state.simulation
  );

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { chargePointTypes, arrivalMultiplier, consumption },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "chargePointTypes" });

  const onSubmit = (data: any) => {
    dispatch(updateChargePoints(data.chargePointTypes));
    dispatch(updateSimulationParams({ arrivalMultiplier: data.arrivalMultiplier, consumption: data.consumption }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Simulation Parameters</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4">
            <div className="flex gap-4">
              {/* Quantity Input */}
              <div className="w-1/2">
                <input
                  type="number"
                  {...register(`chargePointTypes.${index}.quantity`, { required: "Quantity is required", min: { value: 1, message: "Must be at least 1" } })}
                  className="input"
                  placeholder="Quantity"
                />
                {errors.chargePointTypes?.[index]?.quantity && (
                  <p className="text-red-500 text-sm">{errors.chargePointTypes[index]?.quantity?.message}</p>
                )}
              </div>

              {/* Power Input */}
              <div className="w-1/2">
                <input
                  type="number"
                  {...register(`chargePointTypes.${index}.power`, { required: "Power is required", min: { value: 1, message: "Min power is 1kW" }, max: { value: 50, message: "Max power is 50kW" } })}
                  className="input"
                  placeholder="Power (kW)"
                />
                {errors.chargePointTypes?.[index]?.power && (
                  <p className="text-red-500 text-sm">{errors.chargePointTypes[index]?.power?.message}</p>
                )}
              </div>

              <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
            </div>
          </div>
        ))}

        <button type="button" onClick={() => append({ quantity: 1, power: 11 })} className="mt-2 bg-green-500 text-white px-2 py-1 rounded-md">Add</button>

        <label className="block mt-4">
          Arrival Probability Multiplier (%)
          <input
            type="number"
            {...register("arrivalMultiplier", { min: { value: 20, message: "Min: 20%" }, max: { value: 200, message: "Max: 200%" } })}
            className="input"
          />
          {errors.arrivalMultiplier && <p className="text-red-500">{errors.arrivalMultiplier.message}</p>}
        </label>

        <label className="block mt-4">
          Car Consumption (kWh)
          <input
            type="number"
            {...register("consumption", { min: { value: 10, message: "Min: 10kWh" }, max: { value: 50, message: "Max: 50kWh" } })}
            className="input"
          />
          {errors.consumption && <p className="text-red-500">{errors.consumption.message}</p>}
        </label>

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
      </form>
    </div>
  );
};

export default SimulationForm;
