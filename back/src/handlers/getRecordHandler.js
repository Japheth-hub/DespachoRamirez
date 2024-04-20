const getRecord = require('../controllers/getRecord')

module.exports = async function getRecordHandler(req, res){
  try {
    const data = await getRecord()
    res.status(200).json(data)
  } catch (error) {
    console.log('error en el handler', error)
    res.status(500).json(error)
  }
}