import { useFilterOperationByIsFormed } from "../model"

export const FilterOperationByIsFormed = () => {

    const {
        isChecked,
        handleChange,
    } = useFilterOperationByIsFormed()

    return (
        <label className="title flex items-center gap-2">
            Сформированные наряды: 
            <input 
                className="w-5 h-5"
                checked={isChecked}
                onChange={handleChange}
                name="isFormed"
                type="checkbox"/>
        </label>
    )
}