import express from "express";
import * as userController from "../controller/user.controller.js"

const router = express.Router();


// router.get("/fetch" , userController.fetch)

router.post("/save" , userController.save);
router.post("/login" , userController.login);
router.get("/fetchall" , userController.fetchAll);
router.get("/fetch/:user_id" , userController.fetch);
router.get("/fetchByEmail/:email" , userController.fetchByEmail);

router.patch("/update" , userController.update)

router.delete("/deluser/:user_id" , userController.del)

router.patch("/manage" , userController.manageStatus)

router.patch("/forgetpass" , userController.ForgetPass)


router.patch("/pass" , userController.ChangePass)




router.get("*" , (req, res) =>{
    res.send("Url not found");
})


export default router;
