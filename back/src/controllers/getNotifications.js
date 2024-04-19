const {Notification} = require('../db')

module.exports = async function getNotifications(){
  try {
    const data = await Notification.findAll()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}