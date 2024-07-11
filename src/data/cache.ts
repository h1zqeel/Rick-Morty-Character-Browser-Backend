import { createClient } from 'redis';

let cachedClient = null;

const getClient = async () => {
    if (!cachedClient && process.env.NODE_ENV !== 'test' && process.env.REDIS_URL) {
        cachedClient = createClient({
            url: process.env.REDIS_URL
        });
        await cachedClient.connect();
    }
    return cachedClient;
};

const getCharactersKey = (page, filter, order, name) => {
    return `characters:${page}:${JSON.stringify(filter)}:${order}:${name}`;
};

const getCharacterKey = (id) => {
    return `character:${id}`;
};

const createCachedData = async (key, data) => {
    const client = await getClient();
    if (!client) return;

    await client.set(key, JSON.stringify(data));
};

const getCachedData = async (key) => {
    const client = await getClient();
    if (!client) return null;

    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
};

export { createCachedData, getCachedData, getCharactersKey, getCharacterKey };
