const postMessage = require('../controllers/postMessage')
const typeChannel = require('../helpers/typeChannel')

module.exports = async function postMessageHandler(req, res){
  try {
    const handleSend = await typeChannel(req.body)
    if(handleSend.message){
      const data = await postMessage(req)
      res.status(200).json(data)
    } else {
      res.status(404).json({message:'Hubo un error al enviar las notificaciones'}, handleSend)
    }

  } catch (error) {
    console.log('error en el hanlder', error)
    res.status(500).json(error)
  }
}