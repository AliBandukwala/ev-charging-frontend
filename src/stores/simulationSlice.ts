import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChargePointType {
  quantity: number;
  power: number;
}

interface SimulationState {
  chargePointTypes: ChargePointType[];
  arrivalMultiplier: number;
  consumption: number;
}

const initialState: SimulationState = {
  chargePointTypes: [{ quantity: 5, power: 11 }, { quantity: 3, power: 22 }],
  arrivalMultiplier: 100,
  consumption: 18,
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    updateChargePoints: (state, action: PayloadAction<ChargePointType[]>) => {
      state.chargePointTypes = action.payload;
    },
    updateSimulationParams: (state, action: PayloadAction<Partial<SimulationState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateChargePoints, updateSimulationParams } = simulationSlice.actions;
export default simulationSlice.reducer;
