import { Cache, mutate } from "swr"

// замена useSWR при mutate с revalidate: false,
// чтобы не дергать лишний раз API при получении данных из кэша
export const getCachedData = async <T>(
	cache: Cache,
	cacheKey: string,
	fetcher: () => Promise<T>,
	options = { revalidate: false },
): Promise<T | undefined> => {
	const cached = cache.get(cacheKey)

	if (cached && cached.data) {
		return cached.data as T
	}

	const data = await mutate<T>(cacheKey, fetcher, options)
	return data as T | undefined
}
