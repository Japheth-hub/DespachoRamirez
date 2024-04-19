const getUsers = require('../controllers/getUsers')

module.exports = async function getUsersHandler(req, res){
  try {
    const {id} = req.query || false
    const data = await getUsers(id)
    if(data.message){
      return res.status(404).json(data)
    } else {
      return res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}