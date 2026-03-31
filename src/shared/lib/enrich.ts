// type Comparable<T, TKey, TCompare> = TKey extends keyof T ? T[TKey] extends TCompare ? TCompare : never : never

interface IMatch<TInputKey, TSourceKey> {
    sourceKey: TSourceKey,
    inputKey: TInputKey,
}

export const enrich = <
    TInput, 
    TInputKey extends keyof TInput,
    TSource, 
    TSourceKey extends keyof TSource,
    TCompare
> (
    match: IMatch<TInputKey, TSourceKey>, 
    extract: (keyof TSource)[] = [], 
    source: TSource[] = []
) => 
    (inputObject: TInput) => {
        const matchingItem = source.find(item => 
            (item[match.sourceKey] as TCompare) === (inputObject[match.inputKey] as TCompare)
        )

        return extract.reduce<Partial<Pick<TSource, (typeof extract)[number]>> & TInput>((enrichedObject, key) => {
            return {
                ...enrichedObject,
                [key]: matchingItem?.[key],
            }
        }, {...inputObject} as TInput & Partial<Pick<TSource, (typeof extract)[number]>>)
    }

export const enrichAddObject = <    
    TInput, 
    TSource,
    TNewKey extends string,
    TInputKey extends keyof TInput,
    TSourceKey extends keyof TSource,
> (
    match: IMatch<TInputKey, TSourceKey>,
    extract: (keyof TSource)[] | 'all', 
    source: TSource[],
    nameNewObject: TNewKey,
) => 
        (inputObject: TInput): {
            object: Omit<TInput, TInputKey> & {
                [K in TNewKey]: typeof extract extends 'all' 
                    ? TSource 
                    // Только те, что перечислены
                    : Pick<TSource, Exclude<typeof extract, 'all'>[number]>
            };
            success: boolean;
        } => {
        const matchingItem = source.find(item => 
            item[match.sourceKey] as unknown === inputObject[match.inputKey] as unknown
        )
        let newObj ;
        const {[match.inputKey]: _, ...objectWithoutInputKey } = inputObject
        //  все, если all
        if (extract === 'all') {
            newObj = matchingItem

        } else {
            // иначе берём только те, которые в перечислили
            newObj = extract.reduce<Partial<Pick<TSource, (typeof extract)[number]>>>((enrichedObject, key) => {
                return {
                    ...enrichedObject,
                    [key]: matchingItem?.[key],
                }
            }, {})
        }
        
        return ({
            object: {
                ...objectWithoutInputKey, 
                [nameNewObject]: newObj
            } as Omit<TInput, TInputKey> & {
                [K in TNewKey]: typeof extract extends 'all' 
                    ? TSource 
                    // Только те, что перечислены
                    : Pick<TSource, Exclude<typeof extract, 'all'>[number]>
            },
                success: !!matchingItem
        })
    }
