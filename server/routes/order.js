const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const orderC = require('../controllers/orderController');

router.get('/',[verifyAccessToken],orderC.getUserOrder);
router.get('/admin',[verifyAccessToken,isAdmin],orderC.getOrders)
router.post('/',[verifyAccessToken],orderC.createOrder);
router.put('/status/:oid',[verifyAccessToken,isAdmin],orderC.updateStatus);

module.exports = router