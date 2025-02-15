import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false, default: "" },
    gender: { type: String, required: false, default: "Other" },
  },
  { timestamps: true }
);
export interface UserFilter {
  gender?: string;
  phone?: string;
}
export const User = mongoose.model<IUser>("User", UserSchema);
