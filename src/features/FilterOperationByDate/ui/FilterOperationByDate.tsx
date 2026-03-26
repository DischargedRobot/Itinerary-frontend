export const FilterOperationByDate = () => {
    return (
        <div className="flex items-center gap-1.5 title ">
            Дата
            <label className="p-2 bg-[var(--foreground)] border border-[var(--stroke)] rounded-md">
                <input 
                    className="border w-24"
                    type="date"
                    placeholder="C"
                />
            </label>
            :
            <label className="p-2 bg-[var(--foreground)] boder border-[var(--stroke)] rounded-md">
                <input 
                    className="border w-24"
                    type="date" 
                    placeholder="По"
                />
            </label>
        </div>
    )
}