import express from "express";
import * as materialController from "../controller/material.controller.js"

 const router = express.Router();


router.get("/fetchall" , materialController.fetchAll);

router.post("/save" , materialController.save);

router.delete("/delete/:material_id" , materialController.deleteMaterial)

router.get("/fetch/:material_id" , materialController.fetch);

router.patch("/manage" , materialController.manageStatus);

router.patch("/update" ,materialController.update);



export default router;