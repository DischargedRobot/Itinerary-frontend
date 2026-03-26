export const FilterProductByDate = () => {
    return (
        <div className="flex gap-1.5">
            Дата
            <label  className="w-24">
                <input 
                    className="border w-24"
                    type="date"
                    placeholder="C"
                />
            </label>
            :
            <label>
                <input 
                    className="border w-24"
                    type="date" 
                    placeholder="По"
                />
            </label>
        </div>
    )
}