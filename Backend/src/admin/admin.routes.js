import express from "express"
import AdminController from "./admin.controller.js";
import jwtAuth from "../middleware/jwt.middleware.js";


//Express router
const adminRouter = express.Router();
//instance
const adminController =new AdminController();


// All the paths to controller methods.
adminRouter.post("/register", (req,res)=> adminController.register(req,res));
adminRouter.post("/login", (req,res) => adminController.login(req,res));
adminRouter.get("/myDetails",jwtAuth, (req, res) => adminController.myDetails(req, res));



export default adminRouter;