const express = require("express")
const router = express.Router()

const {makeuser ,add, update, remove , searchpri, searchpub , getpassword , getcode, searchbyk} = require("../controllers/basic")

router.route("/makeuser").post(makeuser)
router.route("/add").post(add)
router.route("/update").post(update)
router.route("/remove").post(remove)
router.route("/searchpub").post(searchpub)
router.route("/searchpri").post(searchpri)
router.route("/getpass").post(getpassword)
router.route("/getcode").post(getcode)
router.route("/searchbyk").post(searchbyk)




module.exports = router