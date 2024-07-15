export type UserFormRegister = {
  name: string;
  email: string;
  password: string;
  comfirm_password: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: number;
    email: string;
  };
  token: string;
};
