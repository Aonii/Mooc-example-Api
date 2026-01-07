require('dotenv').config();
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});

redis.on('error', err => {
    console.error('Redis connection error:', err);
});

redis.delPattern = async pattern => {
    const stream = redis.scanStream({ match: pattern, count: 100 });
    const keys = [];
    for await (const resultKeys of stream) {
        keys.push(...resultKeys);
    }
    if (keys.length > 0) {
        await redis.del(...keys);
    }
};

module.exports = redis;
