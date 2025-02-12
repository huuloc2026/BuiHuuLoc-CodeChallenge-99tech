import { IUser, User } from "../models/User.models";

export class UserService {
  // Create a new user
  static async createUser(data: IUser): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  }

  // Get all users with pagination
  static async listUsers(page: number, limit: number): Promise<IUser[]> {
    return await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
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
