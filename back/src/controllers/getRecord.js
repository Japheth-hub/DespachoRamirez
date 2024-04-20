const {Record, User} = require('../db')

module.exports = async function getRecord(){
  try {
    const data = await Record.findAll({
      include : [
        {model: User}
      ],
      order: [['id', 'DESC']]
    })

    const clearData = data.map((item) => {
      return {
        notifications : item.notifications,
        categories : item.categories,
        message : item.message,
        users : item.Users.map((user) => {
          return {
            name : user.name,
            email : user.email,
            phone : user.phone
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