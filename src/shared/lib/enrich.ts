type Comparable<T, TCompare> = {
    [K in keyof T]: T[K] extends TCompare ? K : never
}[keyof T]

interface IMatch<TInput, TSource, TCompare> {
    sourceKey: Comparable<TSource, TCompare> 
    inputKey: Comparable<TInput, TCompare> 
}

export const enrich = <TInput, TSource, TCompare>(
    match: IMatch<TInput, TSource, TCompare>, 
    extract: (keyof TSource)[] = [], 
    source: TSource[] = []
) => 
    (inputObject: TInput) => {
        const matchingItem = source.find(item => (item[match.sourceKey] as TCompare) === (inputObject[match.inputKey] as TCompare)) 
        return extract.reduce<Partial<Pick<TSource, keyof TSource>> & TInput>((enrichedObject, key) => {
            return {
                ...enrichedObject,
                [key]: matchingItem?.[key],
            }
        }, {...inputObject} as TInput & Partial<Pick<TSource, keyof TSource>>)
    }
