const {User} = require('../db')
const Email = require('../helpers/classChannels/email')
const Sms = require('../helpers/classChannels/sms')
const Push = require('../helpers/classChannels/push')

module.exports = async function typeChannel(body){
  try {
    const {phone, emails, notifications, message} = body
    const errores = []
    for(let channel of notifications){
      if(channel === 'email'){
        const classEmail = new Email()
        await classEmail.sendEmail(message, emails)
      }
      if(channel === 'sms'){
        const classSms = new Sms()
        await classSms.sendSms(message, phone)
      }
      if(channel === 'push'){
        const classPush = new Push()
        await classPush.sendPush(message, emails)
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