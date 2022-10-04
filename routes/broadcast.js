const express =  require('express')
let multer = require('multer');
const authMiddleware = require('../middleware/auth')
const bc = require('../controllers/broadcastController');

const router = express.Router()
let upload = multer();


router.post('/',upload.fields([]), bc.register)
router.post('/login',upload.fields([]), bc.login)

router.get('/',authMiddleware, bc.index )
router.get('/delete/:id', authMiddleware, bc.delete )
router.post('/update/:id',[authMiddleware, upload.fields([])], bc.update )

router.post('/contact',[authMiddleware, upload.fields([])], bc.createContact )
router.get('/contact/show',authMiddleware , bc.showContacts )
router.post('/contact/update/:id',[authMiddleware, upload.fields([])], bc.updateContact )
router.get('/contact/delete/:id',authMiddleware, bc.deleteContact )
router.post('/contact/notify',[authMiddleware, upload.fields([])],  bc.notify)


module.exports = router
