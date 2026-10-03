interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes to keep memory minimal
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitMap.entries()) {
    if (record.resetAt <= now) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Lightweight in-memory rate limiter to protect AI / external APIs from quota drain.
 * @param identifier Client IP or identifier string
 * @param maxRequests Maximum requests allowed within window
 * @param windowMs Time window in milliseconds (default: 60,000ms / 1 min)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 15,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  cleanupExpired();

  const now = Date.now();
  const existing = rateLimitMap.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Reset rate limit (useful for testing)
 */
export function resetRateLimits() {
  rateLimitMap.clear();
}
