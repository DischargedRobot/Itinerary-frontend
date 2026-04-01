import { create } from "zustand";
import { IPlanPosition } from "../lib";

interface IPlanPositionStore {
    planPositions: IPlanPosition[]

    setPlanPositions: (newPlanPositions: IPlanPosition[]) => void
}

export const usePlanPositionStore = create<IPlanPositionStore>(set => ({

    planPositions: [],

    setPlanPositions: (planPositions) => set({planPositions}),
}))