const redis = require('./redis');

const PREFIX = 'mooc:';

async function cache(key, ttlSeconds, fetchFn) {
    const fullKey = PREFIX + key;

    // 1. read cache
    try {
        const cached = await redis.get(fullKey);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (readErr) {
        console.warn(`[Cache] Redis READ failed for key=${fullKey}:`, readErr.message);
        // Fallback: ignore read error, continue to execute fetchFn
    }

    // 2. execute fetchFn
    const data = await fetchFn();

    // 3. try to write to cache
    try {
        if (data) {
            await redis.set(fullKey, JSON.stringify(data), 'EX', ttlSeconds);
        }
    } catch (writeErr) {
        console.warn(`[Cache] Redis WRITE failed for key=${fullKey}:`, writeErr.message);
        // Fallback: ignore write error, return data
    }

    return data;
}

async function delCache(pattern, isPattern = false) {
    if (isPattern) {
        return redis.delPattern(PREFIX + pattern);
    } else {
        return redis.del(PREFIX + pattern);
    }
}

module.exports = {
    cache,
    delCache,
};
