import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    sno: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("validate", async function (next) {
  if (!this.sno) {
    let isUnique = false;
    let newSno;

    while (!isUnique) {
      newSno = Math.floor(10000 + Math.random() * 90000).toString();
      const existingAdmin = await mongoose.models.Admins.findOne({
        sno: newSno,
      });
      if (!existingAdmin) {
        isUnique = true; // `sno` is unique
      }
    }

    this.sno = newSno;
  }
  next();
});

const Admin = mongoose.model("Admins", adminSchema);
export default Admin;
