/** Выполняет PromiseAll но возвращает не массив, а объект с ключами = ключам в передаваемом объекте
 * @param {number} promiseObject объект типа { название ключа: сам промис}
 */
export const PromiseAllNamed = async <
	T extends Record<string, Promise<unknown>>,
>(
	promiseObject: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }> => {
	const entries = Object.entries(promiseObject)

	const results = await Promise.all(
		entries.map(([key, promise]) =>
			promise.then((result) => [key, result]),
		),
	)

	return Object.fromEntries(results)
}
