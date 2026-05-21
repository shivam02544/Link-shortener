const app = require("./app");

const pool = require("./config/db");


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