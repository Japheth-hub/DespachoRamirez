const postMessage = require('../controllers/postMessage')

module.exports = async function postMessageHandler(req, res){
  try {
    const data = await postMessage(req)
    res.status(200).json(data)
  } catch (error) {
    console.log('error en el hanlder', error)
    res.status(500).json(error)
  }
}