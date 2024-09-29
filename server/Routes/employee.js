import express from "express";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  addEmployees,
} from "../Controllers/employee.js";
const transactionRouter = express.Router();

transactionRouter.get("/get-employees", getAllEmployees);
transactionRouter.post("/add-employee", addEmployee);
transactionRouter.post("/addMany", addEmployees);
transactionRouter.put("/update-employee/:_id", updateEmployee);
transactionRouter.delete("/delete-employee/:_id", deleteEmployee);

export default transactionRouter;
