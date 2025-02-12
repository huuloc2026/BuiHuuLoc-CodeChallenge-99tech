import { IUser, User } from "../models/User.models";
import bcrypt from "bcrypt";

export class UserService {
  // Create a new user
  static async createUser(data: IUser): Promise<IUser> {
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

  // Get all users with pagination
  static async listUsers(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(); // Get total users count

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
