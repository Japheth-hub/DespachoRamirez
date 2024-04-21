const {Router} = require('express')
const getUsersHandler = require('../handlers/getUsersHandler')
const getCategoriesHandler = require("../handlers/getCategoriesHandler");
const postMessageHandler = require('../handlers/postMessageHandler')
const getRecordHandler = require('../handlers/getRecordHandler')


const router = Router()

router.post('/', postMessageHandler)
router.get('/users', getUsersHandler)
router.get('/categories', getCategoriesHandler);
router.get('/record', getRecordHandler);


module.exports = router;