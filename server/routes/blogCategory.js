const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const blogCategory = require('../controllers/blogCategoryController');

router.post('/',[verifyAccessToken,isAdmin],blogCategory.createProdCategory);
router.get('/',blogCategory.getAllProdCategory);
router.put('/:bCid',[verifyAccessToken,isAdmin],blogCategory.updateCategory);
router.delete('/:bCid',[verifyAccessToken,isAdmin],blogCategory.deleteCategory);


module.exports = router