const express = require("express");
const { Pool } = require("pg");
const { customAlphabet } = require("nanoid");

const app = express();

app.use(express.json());


// DATABASE CONNECTION
const pool = new Pool({
  user: "postgres",
  password: "12345",
  host: "localhost",
  database: "postgres",
  port: "5432"
});


// RANDOM 6 CHARACTER GENERATOR
const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  6
);


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

initDB();


// POST ROUTE
// CREATE SHORT URL
app.post("/url", async (req, res) => {

  try {

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "URL is required"
      });
    }

    // GENERATE RANDOM CODE
    const shortCode = nanoid();

    // INSERT INTO DATABASE
    await pool.query(
      `
      INSERT INTO link_shortner(
        short_code,
        link_address
      )
      VALUES($1, $2)
      `,
      [shortCode, url]
    );

    // RETURN SHORT URL
    return res.status(201).json({
      shortCode,
      shortURL: `http://localhost:3001/${shortCode}`
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
});


// GET ROUTE
// REDIRECT TO ORIGINAL URL
app.get("/:code", async (req, res) => {

  try {

    const { code } = req.params;

    const result = await pool.query(
      `
      SELECT link_address
      FROM link_shortner
      WHERE short_code = $1
      `,
      [code]
    );

    // CHECK IF URL EXISTS
    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Short URL not found"
      });
    }

    const originalURL =
      result.rows[0].link_address;

    // REDIRECT USER
    return res.redirect(originalURL);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
});


// START SERVER
app.listen(3001, () => {
  console.log("Server running on port 3001");
});