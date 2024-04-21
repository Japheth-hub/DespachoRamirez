const {User, Notification} = require('../db')
const Email = require('../helpers/classChannels/email')
const Sms = require('../helpers/classChannels/sms')
const Push = require('../helpers/classChannels/push')

module.exports = async function typeChannel(body){
  try {
    const {users, message} = body
    const errores = []
    for(let user of users){
      const userDB = await User.findOne(
        {
          where : {id : user}, 
          include: [{model: Notification}]
        })
      for(let type of userDB.Notifications){
        switch(type.name){
          case 'email':
            const classEmail = new Email()
            await classEmail.sendEmail(message, userDB.email)
            break
          case 'sms':
            const classSms = new Sms()
            await classSms.sendSms(message, userDB.phone)
            break
          case 'push':
            const classPush = new Push()
            await classPush.sendPush(message, userDB.name)
            break
          default:
            return 'No existe ningun tipo de notificacion valida'
        }
      }

    }
    if(errores.length === 0){
      return {message: 'Notificaciones enviadas con exito'}
    } else {
      return errores
    }
  } catch (error) {
    console.log(error)
    return error
  }
}