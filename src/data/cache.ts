import { createClient } from 'redis';
const TTL = 60 * 30; // 15 minutes

let cachedClient = null;

const getClient = async () => {
	if (
		!cachedClient &&
		process.env.NODE_ENV !== 'test' &&
		process.env.REDIS_URL
	) {
		cachedClient = createClient({
			url: process.env.REDIS_URL
		});
		await cachedClient.connect();
	}
	return cachedClient;
};

const getCharactersKey = (page, filter, order, name) => {
	let key = `characters:${page}`;
	if (filter.status && filter.status !== ' ') key += `:${filter.status}`;
	if (filter.species && filter.species !== ' ') key += `:${filter.species}`;
	if (order) key += `:${order}`;
	if (name) key += `:${name}`;

	return key;
};

const getCharacterKey = (id) => {
	return `character:${id}`;
};

const createCachedData = async (key, data) => {
	const client = await getClient();
	if (!client) return;

	await client.set(key, JSON.stringify(data), {EX: TTL });
};

const getCachedData = async (key) => {
	const client = await getClient();
	if (!client) return null;

	const data = await client.get(key);
	return data ? JSON.parse(data) : null;
};

export { createCachedData, getCachedData, getCharactersKey, getCharacterKey };
