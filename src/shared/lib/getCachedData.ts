import { Cache, mutate } from "swr"

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
