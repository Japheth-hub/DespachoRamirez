const {User, Record} = require('../db')

module.exports = async function postMessage(req){
  try {
    const {users, categories, message} = req.body
    if(![users, categories, message].every(Boolean)){
      return {message: 'Datos incompletos'}
    }
    const record = await Record.create({
        categories,
        message
      })
    if(record){
      for(let userId of users){
        const user = await User.findByPk(userId)
        user && await user.addRecord(record)
      }
      return {message : 'Message send with succesfull'}
    }
    return {message : `Could not send message`}
  } catch (error) {
    console.log('post error', error)
    return error
  }
}