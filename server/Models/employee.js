import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not valid`,
      },
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      enum: ["HR", "MANAGER", "SALES"],
      required: false,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    course: {
      type: [String],
      enum: ["MCA", "BCA", "BSC"],
      required: true,
    },
  },
  { timestamps: true }
);

employeeSchema.pre("validate", async function (next) {
  if (!this.id) {
    let isUnique = false;
    let newId;

    while (!isUnique) {
      newId = Math.floor(10000 + Math.random() * 90000).toString();
      const existingEmployee = await mongoose.models.Employees.findOne({
        id: newId,
      });
      if (!existingEmployee) {
        isUnique = true;
      }
    }

    this.id = newId; 
  }
  next();
});

const Employees = mongoose.model("Employees", employeeSchema);
export default Employees;
