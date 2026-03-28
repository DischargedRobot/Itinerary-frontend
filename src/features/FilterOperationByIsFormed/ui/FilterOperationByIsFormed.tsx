import { useFilterOperationByIsFormed } from "../model"

export const FilterOperationByIsFormed = () => {

    const {
        isChecked,
        handleChange,
    } = useFilterOperationByIsFormed()

    return (
        <label>
            Сформированные наряды: 
            <input 
                checked={isChecked}
                onChange={handleChange}
                name="isFormed"
                type="checkbox"/>
        </label>
    )
}