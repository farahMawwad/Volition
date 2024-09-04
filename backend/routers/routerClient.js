const express = require("express");
const router = express.Router();
const userController = require("../controller/controllerClient");
const upload = require('../middleware/multerConfig');
router.route('/info/:id').get(userController.veiwUser);
router.route('/infoEdit/:id').patch( upload.single('image'),userController.editUser);
router.route('/veiw/:database').get(userController.veiw);
router.route('/SuggestionAdd').post(userController.add);
router.route('/CartAdd/:id').post(userController.addCart);
module.exports = router