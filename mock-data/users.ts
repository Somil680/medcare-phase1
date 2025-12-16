import { User } from "@/domain/entities/User";

/**
 * Mock user data
 * Future: This will be replaced with real authentication
 */
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 111-2222",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 222-3333",
    createdAt: new Date("2024-02-20"),
  },
];

