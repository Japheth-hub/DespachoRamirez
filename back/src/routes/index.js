const {Router} = require('express')
const getUsersHandler = require('../handlers/getUsersHandler')
const getNotificationsHandler = require('../handlers/getNotificationsHandler')
const getCategoriesHandler = require("../handlers/getCategoriesHandler");
const postMessageHandler = require('../handlers/postMessageHandler')
const getRecordHandler = require('../handlers/getRecordHandler')


const router = Router()

router.post('/', postMessageHandler)
router.get('/users', getUsersHandler)
router.get('/notifications', getNotificationsHandler);
router.get('/categories', getCategoriesHandler);
router.get('/record', getRecordHandler);


module.exports = router;