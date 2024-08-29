const express = require("express");
const router = express.Router()
const AdminController =require ('../controller/controllerAdmin')
router.route('/add/:database').post(AdminController.add);
router.route('/veiw/:database').get(AdminController.veiw);
router.route('/veiwItem/:database/:id').get(AdminController.veiwItem);
router.route('/editItem/:database/:id').patch(AdminController.edit);
router.route('/deleteItem/:database/:id').delete(AdminController.delete);
module.exports = router;