import redis from "../config/redis.config.js";

export const setCache = async (key, value, ttl = 60) => {
  await redis.set(key, JSON.stringify(value), { ex: ttl });
};

export const getCache = async (key) => {
  const data = await redis.get(key);

  if (!data) return null;

  try {
    return data;
  } catch (err) {
    await redis.del(key);
    return null;
  }
};

export const deleteCache = async (key) => {
  await redis.del(key);
};

export const deleteCacheByPrefix = async (prefix) => {
  const keys = await redis.keys(`${prefix}*`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};
