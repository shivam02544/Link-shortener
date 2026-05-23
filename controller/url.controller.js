const {
  createURLService,
  getOriginalURLService
} = require("../services/url.service");


// CREATE SHORT URL
const createShortURLController = async (req, res) => {

  try {

    const { url } = req.body;

    // VALIDATION
    if (!url) {
      return res.status(400).json({
        error: "URL is required"
      });
    }

    const result = await createURLService(url);

    return res.status(201).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
};


// REDIRECT TO ORIGINAL URL
const redirectURLController = async (req, res) => {

  try {

    const { code } = req.params;

    const result =
      await getOriginalURLService(code);
    console.log(result);
    
    // CHECK IF URL EXISTS
    if (!result) {

      return res.status(404).json({
        error: "Short URL not found"
      });
    }

    return res.redirect(result.link_address);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
};


module.exports = {
  createShortURLController,
  redirectURLController
};