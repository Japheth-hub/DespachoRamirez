const {Router} = require('express')
const getUsersHandler = require('../handlers/getUsersHandler')


const router = Router()

router.get('/', getUsersHandler)

module.exports = router;