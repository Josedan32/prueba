const {Router} = require('express')

const router = Router()
const {postaunt} = require('../controller/auth.controller')


router.post('/',postaunt)




module.exports = router