// networkUtils.js
export const retryRequest = async (request, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await request();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`Retrying... Attempt ${i + 1}`);
    }
  }
};

export const concurrentRequestHandler = async (requests, limit = 3) => {
  const results = [];
  for (let i = 0; i < requests.length; i += limit) {
    const batch = requests.slice(i, i + limit).map(req => req());
    results.push(...(await Promise.allSettled(batch)));
  }
  return results;
};

export const handleNetworkRequests = async ({
  essentialRequests = [],
  nonEssentialRequests = [],
  loadingSetter,
}) => {
  try {
    // Show loading indicator for essential requests
    if (loadingSetter) loadingSetter(true);

    // Handle essential requests with retry logic
    const essentialResults = await Promise.allSettled(
      essentialRequests.map(req => retryRequest(req)),
    );
    essentialResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Essential API #${index + 1} failed:`, result.reason);
      }
    });

    // Hide loading indicator after essential requests
    if (loadingSetter) loadingSetter(false);

    // Handle non-essential requests with concurrency limit
    const nonEssentialResults = await concurrentRequestHandler(
      nonEssentialRequests,
      3,
    );
    nonEssentialResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Non-essential API #${index + 1} failed:`, result.reason);
      }
    });
  } catch (err) {
    console.error('Network request error:', err);
    throw err;
  }
};
