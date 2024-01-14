import express from "express";
import * as courseController from "../controller/course.controller.js"
export const router = express.Router();


router.post("/save", courseController.save);

router.get("/fetchall",courseController.fetchAll);

router.delete("/delete/:course_id" , courseController.deleteCourse);

router.get("/fetch/:course_id",courseController.fetch);

router.patch("/manage" , courseController.manageStatus)

router.patch("/update" , courseController.update);


export default router;