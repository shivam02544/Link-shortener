const pool = require("../config/db");


// INSERT SHORT URL
const createShortURL = async (shortCode, url) => {

  const query = `
    INSERT INTO link_shortner(
      short_code,
      link_address
    )
    VALUES($1, $2)
    RETURNING *
  `;

  const values = [shortCode, url];

  const result = await pool.query(query, values);

  return result.rows[0];
};


// FIND URL BY SHORT CODE
const findByShortCode = async (code) => {

  const query = `
    SELECT link_address
    FROM link_shortner
    WHERE short_code = $1
  `;

  const values = [code];

  const result = await pool.query(query, values);

  return result.rows[0];
};


module.exports = {
  createShortURL,
  findByShortCode
};