const pool = require("../config/db");


const createAnalytics = async (shortCode) => {

  const query = `
    INSERT INTO analytics(short_code)
    VALUES($1)
  `;

  const values = [shortCode];

  await pool.query(query, values);
};


module.exports = {
  createAnalytics
};