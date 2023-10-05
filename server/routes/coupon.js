const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const coupon = require('../controllers/couponController');

router.post('/',[verifyAccessToken,isAdmin],coupon.createNewCoupon);
router.get('/',coupon.getCoupons);
router.put('/:cid',[verifyAccessToken,isAdmin],coupon.updateCoupon);
router.delete('/:cid',[verifyAccessToken,isAdmin],coupon.deleteCoupon);



module.exports = router