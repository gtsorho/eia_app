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
router.get('/contact/show',authMiddleware , bc.showContacts)
router.get('/contact/show/:id',authMiddleware , bc.showContactOne)
router.get('/contact/:extname',authMiddleware , bc.searchContacts)
router.post('/contact/update/:id',[authMiddleware, upload.fields([])], bc.updateContact )
router.get('/contact/delete/:id',authMiddleware, bc.deleteContact )
router.post('/contact/notify',[authMiddleware, upload.fields([])],  bc.notify)

router.post('/group',[authMiddleware, upload.fields([])], bc.createExtGroup )//*** */
router.get('/group/show',authMiddleware , bc.showExtGroup)//*** */
router.post('/group/update/:id',[authMiddleware, upload.fields([])], bc.updateExtGroup )//** */
router.get('/group/delete/:id',authMiddleware, bc.deleteExtGroup )//*** */

router.post('/grouplink',[authMiddleware, upload.fields([])], bc.addGroupLink )//**** */
router.get('/grouplink/show/:ExtGroupId',authMiddleware , bc.showGroupLink )//*** */
router.get('/grouplink/delete/:id',authMiddleware, bc.deleteGroupLink )
module.exports = router
