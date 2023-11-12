const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const productC = require('../controllers/productController');
const uploader = require('../config/cloudinary.config');

router.post('/',[verifyAccessToken,isAdmin],uploader.fields([
    {name:'images', maxCount : 10},
    {name :'thumb', maxCount : 1}
]),productC.createProduct)
router.get('/',productC.getAllProducts)
router.put('/ratings',verifyAccessToken,productC.ratings)


router.put('/uploadImage/:pid',[verifyAccessToken,isAdmin],uploader.array('images',10),productC.uploadImageProduct);
router.put('/:pid',[verifyAccessToken,isAdmin],productC.updateProduct)
router.delete('/:pid',[verifyAccessToken,isAdmin],productC.deleteProduct)
router.get('/:pid',productC.getProduct)


module.exports = router