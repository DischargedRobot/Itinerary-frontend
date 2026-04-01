import { usePlanPositionStore } from "@/entities/PlanPosition"

export const useByPlanPosition = () => {

    const planPositions = usePlanPositionStore(state => state.planPositions)

    // const sets = useStore

    const handleSelect = () => {
        
        
    }

    return {
        planPositions,
        handleSelect,
    }
}