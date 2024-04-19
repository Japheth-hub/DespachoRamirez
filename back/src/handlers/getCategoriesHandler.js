const getCategories = require("../controllers/getCategories");

module.exports = async function getNotificationsHandler(req, res) {
  try {
    const data = await getCategories();
    res.status(200).json(data);
  } catch (error) {
    res.status(error).json(error);
  }
};
