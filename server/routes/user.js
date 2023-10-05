const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken')
const userC = require('../controllers/userController');
router.post('/register',userC.register);
router.get('/login',userC.login);
router.get('/current',verifyAccessToken,userC.getCurrent);
router.post('/refreshToken',userC.refreshAccessToken);
router.get('/logout',userC.logout);
router.get('/forgotPassword',userC.forgotPassword);
router.put('/resetPassword',userC.resetPassword);
router.get('/',[verifyAccessToken,isAdmin],userC.getUsers);
router.delete('/',[verifyAccessToken,isAdmin],userC.deleteUser);
router.put('/current',[verifyAccessToken],userC.updateUser);
router.put('/address',[verifyAccessToken],userC.updateUserAddress)
router.put('/cart',[verifyAccessToken],userC.updateCart);
router.put('/:uid',[verifyAccessToken,isAdmin],userC.updateUserByAdmin);



module.exports = router