const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const prodCategory = require('../controllers/prodCategoryController');

router.post('/',[verifyAccessToken,isAdmin],prodCategory.createProdCategory);
router.get('/',prodCategory.getAllProdCategory);
router.put('/:pCid',[verifyAccessToken,isAdmin],prodCategory.updateCategory);
router.delete('/:pCid',[verifyAccessToken,isAdmin],prodCategory.deleteCategory);


module.exports = router