const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const brand = require('../controllers/brandController');

router.post('/',[verifyAccessToken,isAdmin],brand.createNewBrand);
router.get('/',brand.getBrands);
router.put('/:bid',[verifyAccessToken,isAdmin],brand.updateBrand);
router.delete('/:bid',[verifyAccessToken,isAdmin],brand.deleteBrand);


module.exports = router