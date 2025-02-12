import { model, Schema } from "mongoose";
export interface IShop extends Document {
  name: string;
  email: string;
  password: string;
  roles?: string;
}
const DOCUMENT_NAME = "SHOP";
const COLLECTION_NAME = "SHOPS";

// Declare the Schema of the Mongo model
const shopSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER", "MODERATOR"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
const ShopModel = model<IShop & Document>(DOCUMENT_NAME, shopSchema);

export default ShopModel;
