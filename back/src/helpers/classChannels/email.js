class Email{

  sendEmail(message, listEmail) {
    listEmail.map((email) => {
      //A QUI VA LA LOGICA PARA ENVIAR EL CORREO A CADA USUARIO
      console.log(`El mensaje se envio correctamente al correo : ${email}`)
    })
  }

}

module.exports = Email