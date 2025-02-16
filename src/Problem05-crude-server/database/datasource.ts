import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const node_env = process.env.NODE_ENV;
const test_URI = process.env.MONGO_URI;

const MONGO_URI = test_URI?.toString() || "";
class MongoDBConnect {
  constructor() {
    this.connect();
  }

  async connect(type = "mongodb") {
    if (node_env === "development") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(MONGO_URI, {
        maxPoolSize: 100,
      })
      .then(() => {})
      .catch((err: Error) =>
        console.error("Error connecting database: " + err)
      );
    mongoose.connection.on("connected", () => {
      console.info("Connected to MongoDB!");
    });

    mongoose.connection.on("reconnected", () => {
      console.info("MongoDB reconnected!");
    });

    mongoose.connection.on("error", (error) => {
      console.error(`Error in MongoDb connection: ${error}`);
      mongoose.disconnect();
    });
  }

  static instance;
  static getInstance() {
    if (!MongoDBConnect.instance) {
      MongoDBConnect.instance = new MongoDBConnect();
    }
    return MongoDBConnect.instance;
  }
}

const instanceMongoDb = MongoDBConnect.getInstance();
export default instanceMongoDb;
