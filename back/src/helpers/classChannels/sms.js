class Sms{

  sendSms(message, listPhone){
    listPhone.map((phone) => {
      //Aqui va la logica para hacer el envio real del mensaje
      console.log(`El mensaje se envio correctamente al numero : ${phone}`)
    })
  }

}

module.exports = Sms