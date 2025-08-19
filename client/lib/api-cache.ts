// Simple in-memory cache for API responses
type CacheEntry = {
  data: any;
  timestamp: number;
  expiresIn: number;
};

class ApiCache {
  private cache = new Map<string, CacheEntry>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  // Generate cache key from query and options
  private getCacheKey(query: string, options?: Record<string, any>): string {
    const normalized = query.toLowerCase().trim();
    const optionsKey = options ? JSON.stringify(options) : "";
    return `${normalized}:${optionsKey}`;
  }

  // Get cached response if valid
  get<T>(query: string, options?: Record<string, any>): T | null {
    const key = this.getCacheKey(query, options);
    const entry = this.cache.get(key);

    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  // Set cached response
  set<T>(
    query: string,
    data: T,
    options?: Record<string, any>,
    ttl?: number,
  ): void {
    const key = this.getCacheKey(query, options);
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      expiresIn: ttl || this.defaultTTL,
    };

    this.cache.set(key, entry);
  }

  // Clear specific cache entry
  delete(query: string, options?: Record<string, any>): void {
    const key = this.getCacheKey(query, options);
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const apiCache = new ApiCache();

// Enhanced API function with caching
export async function getCachedAnswer(
  question: string,
  level: string = "15-year-old",
  useCache: boolean = true,
): Promise<{
  answer: string;
  sources: any[];
  category?: string;
  urgency?: string;
}> {
  const options = { level };

  // Try cache first
  if (useCache) {
    const cached = apiCache.get<{
      answer: string;
      sources: any[];
      category?: string;
      urgency?: string;
    }>(question, options);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: question,
        level: level,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the successful response
    if (useCache) {
      apiCache.set(question, data, options);
    }

    return data;
  } catch (err) {
    console.error("Error fetching answer:", err);
    throw err;
  }
}
