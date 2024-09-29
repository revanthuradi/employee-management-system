import Employees from "../Models/employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();
    if (employees.length === 0) {
      return res.status(404).json({
        message: "No employees found",
      });
    }

    return res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const addEmployee = async (req, res) => {
  const { image, name, email, mobile, designation, gender, course } = req.body;
  console.log(req.body);
  if (
    !image ||
    !name ||
    !email ||
    !mobile ||
    !designation ||
    !gender ||
    !course
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEmployee = await Employees.create({
      image,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    return res.status(201).json({
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const addEmployees = async (req, res) => {
  const employees = req.body.employees; // Assuming the array of employees is in the body

  if (!Array.isArray(employees) || employees.length === 0) {
    return res
      .status(400)
      .json({ message: "An array of employees is required" });
  }

  const missingFields = employees.some(
    ({ image, name, email, mobile, designation, gender, course }) =>
      !image || !name || !email || !mobile || !designation || !gender || !course
  );

  if (missingFields) {
    return res
      .status(400)
      .json({ message: "All fields are required for every employee" });
  }

  try {
    const newEmployees = await Employees.insertMany(employees);

    return res.status(201).json({
      message: "Employees added successfully",
      employees: newEmployees,
    });
  } catch (error) {
    console.error("Error adding employees:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);

  if (!_id) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    const updatedEmployee = await Employees.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      message: "employee updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);

    return res.status(500).json({
      message: "Failed to update employee details, please try again",
      error: error.message,
    });
  }
};
export const deleteEmployee = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  if (!_id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  try {
    const result = await Employees.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Employee:", error);

    return res.status(500).json({
      message: "Internal Server Error. Please try again",
      error: error.message,
    });
  }
};
