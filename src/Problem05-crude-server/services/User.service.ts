import { IUser, User } from "../models/User.models";
import bcrypt from "bcrypt";

export class UserService {
  // Create a new user
  static async createUser(data: IUser): Promise<IUser> {
    const checkExist = await this.checkEmailExist(data.email);
    if (checkExist) {
      throw new Error("Email already exists");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    // Create user with hashed password
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  static async checkEmailExist(email: string): Promise<boolean> {
    const emailExist = await User.findOne({ email });
    return emailExist !== null;
  }

  // Get all users with pagination
  static async listUsers(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(); // Get total users count

    return { users, totalUsers };
  }
  static async listUsersWithFilter(
    condition: any,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    let query: any = { ...condition }; // Default query (empty means no filtering)

    const users = await User.find(query).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(query); // Count users matching the filter

    return { users, totalUsers };
  }

  // Get a single user by ID
  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  // Update user details
  static async updateUser(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    console.log(id);
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a user
  static async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}
