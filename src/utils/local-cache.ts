export default function localCache(key: string) {
  const timeKey = `${key}-time`;
  const now = Date.now();
  return {
    get: () => {
      const cachedData = localStorage.getItem(key);
      const cachedTime = localStorage.getItem(timeKey);
      const cacheExpiry = 60 * 60 * 1000;
      return cachedData &&
        cachedTime &&
        now - parseInt(cachedTime, 10) < cacheExpiry
        ? cachedData
        : null;
    },
    set: (data: unknown) => {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(timeKey, now.toString());
    },
    remove: () => {
      localStorage.removeItem(key);
      localStorage.removeItem(timeKey);
    },
  };
}
