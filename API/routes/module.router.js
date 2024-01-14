import express from "express";
import * as moduleController from "../controller/module.controller.js"
export const router = express.Router();


router.get("/fetchall" , moduleController.fetchAll);

router.post("/save" , moduleController.save);

router.delete("/delete/:module_id" , moduleController.deleteModule);

router.get("/fetch/:module_id" , moduleController.fetch);

router.patch("/manage" , moduleController.manageStatus)


router.patch("/update" ,moduleController.update);

export default router;