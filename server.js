const app = require("./app");

const pool = require("./config/db");
require("./workers/analytics.worker");


// CREATE TABLE
const initDB = async () => {

  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS link_shortner (
        id SERIAL PRIMARY KEY,
        short_code VARCHAR(6) UNIQUE,
        link_address TEXT
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics (
      id SERIAL PRIMARY KEY,
      short_code VARCHAR(6),
      clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database ready");

  } catch (error) {

    console.error(error);
  }
};



// START SERVER
const startServer = async () => {

  await initDB();

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
};


startServer();