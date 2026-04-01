import { Cache, mutate } from "swr"

export const getCachedData = async <T>(
	cache: Cache,
	cacheKey: string,
	fetcher: () => Promise<T>,
	options = { revalidate: false },
): Promise<T> => {
	const cached = cache.get(cacheKey)

	if (cached) {
		return cached as T
	}

	const data = await mutate(cacheKey, fetcher, options)
	return data as T
}
