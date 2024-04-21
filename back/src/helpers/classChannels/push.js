class Push{

  sendPush(message, listUsers) {
    listUsers.map((user) => {
      //A QUI VA LA LOGICA PARA ENVIAR EL CORREO A CADA USUARIO
      console.log(`El mensaje se envio correctamente al usuario: ${user.slice(0, 6)}`)
    })
  }

}

module.exports = Push