const logger = require('./logger');

let keepAliveTimer = null;

/**
 * Sends a lightweight GET request to the target health URL.
 * @param {string} targetUrl
 */
async function ping(targetUrl) {
  try {
    const res = await fetch(targetUrl, {
      signal: AbortSignal.timeout(10000), // 10-second timeout
      headers: {
        'User-Agent': 'Render-KeepAlive/1.0',
      },
    });

    if (res.ok) {
      logger.info(`Keep-alive ping to ${targetUrl} successful (status: ${res.status})`);
    } else {
      logger.warn(`Keep-alive ping to ${targetUrl} responded with status: ${res.status}`);
    }
  } catch (error) {
    logger.warn(`Keep-alive ping to ${targetUrl} failed: ${error.message}`);
  }
}

/**
 * Starts the periodic keep-alive ping service.
 */
function startKeepAlive() {
  if (keepAliveTimer) {
    logger.warn('Keep-alive service is already running.');
    return;
  }

  // Explicitly disabled via env
  if (process.env.KEEP_ALIVE_ENABLED === 'false') {
    logger.info('Keep-alive service is explicitly disabled (KEEP_ALIVE_ENABLED=false).');
    return;
  }

  // Determine backend URL (RENDER_EXTERNAL_URL is auto-populated on Render)
  const rawUrl = process.env.BACKEND_URL || process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL;

  if (!rawUrl) {
    logger.info('Keep-alive service is dormant: No backend URL configured (BACKEND_URL or RENDER_EXTERNAL_URL).');
    return;
  }

  const backendUrl = rawUrl.replace(/\/+$/, '');
  const endpoint = process.env.KEEP_ALIVE_ENDPOINT || '/health';
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const targetUrl = `${backendUrl}${cleanEndpoint}`;

  // Default to 14 minutes to stay comfortably within Render's 15-minute idle limit
  const parsedMinutes = parseFloat(process.env.KEEP_ALIVE_INTERVAL_MINUTES);
  const intervalMinutes = !isNaN(parsedMinutes) && parsedMinutes > 0 ? parsedMinutes : 14;
  const intervalMs = Math.round(intervalMinutes * 60 * 1000);

  logger.info(`Starting keep-alive service -> target: ${targetUrl} (interval: ${intervalMinutes}m)`);

  keepAliveTimer = setInterval(() => {
    ping(targetUrl);
  }, intervalMs);

  // Unref timer so it does not block Node process exit (e.g. during graceful shutdown or tests)
  if (keepAliveTimer.unref) {
    keepAliveTimer.unref();
  }
}

/**
 * Stops the keep-alive service.
 */
function stopKeepAlive() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
    logger.info('Keep-alive service stopped.');
  }
}

module.exports = {
  startKeepAlive,
  stopKeepAlive,
  ping,
};
