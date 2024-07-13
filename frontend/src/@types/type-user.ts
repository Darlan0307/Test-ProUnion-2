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
