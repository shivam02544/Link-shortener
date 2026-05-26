const {
  createAnalytics
} = require("../repositories/analytics.repository");


const createAnalyticsService =
  async (shortCode) => {

    await createAnalytics(shortCode);
};


module.exports = {
  createAnalyticsService
};