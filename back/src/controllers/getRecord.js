const {Record, User, Notification} = require('../db')

module.exports = async function getRecord(){
  try {
    const data = await Record.findAll({
      include : [
        {model: User,
        include: [{model: Notification}]
        }
      ],
      order: [['id', 'DESC']]
    })
    const clearData = data.map((item) => {
      return {
        categories : item.categories,
        message : item.message,
        users : item.Users.map((user) => {
          return {
            name : user.name,
            email : user.email,
            phone : user.phone,
            channel : user.Notifications.map((type) => type.name)
          }
        })
      }
    })
    return clearData
  } catch (error) {
    console.log(error)
    return error
  }
}