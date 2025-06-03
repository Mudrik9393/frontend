export type UserRequest = {
  userName: string;
  zanId: string;
  email: string;
  password: string;
  roleName: string;
};

export type Role = {
  roleId: number;
  roleName: string;
  status: boolean;
};

export type UserResponse = {
  userId: number;
  userName: string;
  zanId: string;
  email: string;
  role: Role;
};
