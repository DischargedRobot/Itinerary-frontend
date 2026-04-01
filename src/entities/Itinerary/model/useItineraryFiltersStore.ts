import { IPlanPosition } from "@/entities/PlanPosition/lib";
import { create } from "zustand";

interface IItineraryFiltersStore {
    planPositionId?: number

    setPlanPositionId: (newPlanPositon: number) => void
}

export const useItineraryFiltersStore = create<IItineraryFiltersStore>(set => ({

    planPositionId: undefined,

    setPlanPositionId: (planPositionId) => set({planPositionId})
}))