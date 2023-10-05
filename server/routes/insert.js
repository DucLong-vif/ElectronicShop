const router = require('express').Router();
const inC = require('../controllers/insertController');

router.post('/',inC.InsertProduct);
router.post('/cate',inC.insertCategory);


module.exports = router