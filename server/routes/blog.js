const router = require('express').Router();
const {verifyAccessToken,isAdmin} = require('../middleware/verifyToken');
const blogC = require('../controllers/blogController');
const uploader = require('../config/cloudinary.config')
router.get('/getBlogs',blogC.getBlogs);
router.get('/one/:bid',blogC.getBLog);
router.post('/',[verifyAccessToken,isAdmin],blogC.createNewBlog);
router.put('/image/:bid',[verifyAccessToken,isAdmin],uploader.single('image'),blogC.uploadImageBlog)
router.put('/likes/:bid',[verifyAccessToken],blogC.likeBlog);
router.put('/dislikes/:bid',[verifyAccessToken],blogC.dislikeBlog);
router.put('/:bid',[verifyAccessToken,isAdmin],blogC.updateBlog);
router.delete('/:bid',[verifyAccessToken,isAdmin],blogC.deleteBlog);




module.exports = router;