import { AuthProvider, User } from "../types";
import { hash, compare } from "../utils/bcrypt";

// In-memory user store for development
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    // This is the hashed version of "adminpass"
    hashedPassword: "$2b$10$FcjYN6h3PlvEkyD/HXLDt.CjnCtPRNsIFzpiFsB2ExtbHyxVRwez."
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    // This is the hashed version of "password"
    hashedPassword: "$2b$10$WtXLpHnyyFP0NFs7kGKTouupMe3v6ToBO1.4Hc/1IRh72H2h8PsyW"
  }
];

export const memoryAuthProvider: AuthProvider = {
  getUserByEmail: async (email: string) => {
    try {
      const user = users.find(u => u.email === email);
      if (!user) return null;
      // Return user without the password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error("Error getting user by email", { cause: error });
    }
  },
  
  validatePassword: async (user: User, password: string) => {
    try {
      const fullUser = users.find(u => u.id === user.id);
      if (!fullUser || !fullUser.hashedPassword) return false;
      
      return compare(password, fullUser.hashedPassword);
    } catch (error) {
      throw new Error("Error validating password", { cause: error });
    }
  },
  
  createUser: async (email: string, password: string, name?: string) => {
    try {
      const hashedPassword = await hash(password, 10);
      const newUser: User & { hashedPassword: string } = {
        id: String(users.length + 1),
        email,
        name: name || email.split('@')[0],
        role: "user",
        hashedPassword
      };
    
      users.push(newUser);

      // Return user without the password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      throw new Error("Error creating user", { cause: error });
    }
  }
};
