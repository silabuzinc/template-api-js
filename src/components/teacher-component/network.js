import { Router } from "express";
import * as Controller from "./controller";

const teacherRouter = Router();

teacherRouter.route("/").post(Controller.create);

export default teacherRouter;
