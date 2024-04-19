const getNotifications = require('../controllers/getNotifications')

module.exports = async function getNotificationsHandler(req, res){
  try {
    const data = await getNotifications()
    res.status(200).json(data)
  } catch (error) {
    res.status(error).json(error)
  }
}