import { UserFormRegister, UserResponse } from "@/@types/type-user";
import { createContext } from "react";

// Tipo de usuário autenticado
export type UserAuth = {
  info: {
    id: number;
    email: string;
  };
  token: string;
};

// Tipo de contexto
type ContextValue = {
  user: UserAuth;
  signIn: (email: string, password: string) => Promise<void>;
  createUser: (
    dataUser: Omit<UserFormRegister, "comfirm_password">,
    isNewLogin?: boolean
  ) => Promise<void>;
  signOut: () => void;
  signed: boolean;
  updateUser: (user: UserResponse) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  reloadData: boolean;
  setReloadData: (reloadData: boolean) => void;
};

// Criando o contexto
export const UserContext = createContext({} as ContextValue);
