const analyticsQueue =
  require("../queues/analytics.queue");

const {
  createAnalyticsService
} = require("../services/analytics.service");


// PROCESS QUEUE EVERY 5 SECONDS
setInterval(async () => {

  if (analyticsQueue.length === 0) {
    return;
  }

  console.log(
    `Processing ${analyticsQueue.length} analytics`
  );

  while (analyticsQueue.length > 0) {

    const shortCode =
      analyticsQueue.shift();

    await createAnalyticsService(shortCode);
  }

}, 5000);