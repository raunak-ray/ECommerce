import { Redis } from "@upstash/redis";
import "dotenv/config";

// Validate required environment variables
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!UPSTASH_REDIS_REST_URL) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL environment variable is not defined. Please set it in your .env file.",
  );
}

if (!UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(
    "UPSTASH_REDIS_REST_TOKEN environment variable is not defined. Please set it in your .env file.",
  );
}

// Create Redis instance only after validation
const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
