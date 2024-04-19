const {User} = require('../db')

module.exports = async function getUsers(id){
  try {
    if(!id){
      const users = await User.findAll()
      return users.length > 0 ? users : "No hay Usuarios"
    } else {
      const user = await User.findOne({where : {id : parseInt(id)}})
      return user ? user : "No existe ese usuario";
    }
  } catch (error) {
    console.log(error)
    return error
  }
}