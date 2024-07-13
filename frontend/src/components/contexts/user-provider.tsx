import { api } from "@/services/api";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserContext } from "./user-context";
import { UserResponse } from "@/@types/type-user";
import { errorMessage } from "@/utils/error-message";
import { sucessMessage } from "@/utils/sucess-message";

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState<UserAuth>({
    info: {
      id: 0,
      email: "",
    },
    token: "",
  });

  const navigate = useNavigate();

  // Carregando os dados do localstorage
  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = JSON.parse(
        localStorage.getItem("@Auth:user") || "null"
      );
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
        setSigned(true);
        navigate("/users");
      }
    };
    loadingStoreData();
  }, [navigate]);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      // Criando o usuário
      const response = await api.post("/users", { name, email, password });

      setUser(response.data);

      // Salvando o token no localstorage
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      localStorage.setItem("@Auth:token", response.data.token);
      setSigned(true);
      // Notificando que o usuário foi criado com sucesso
      sucessMessage("Conta criada com sucesso!");
      navigate("/users");
    } catch (error) {
      // Notificando que houve um erro ao criar o usuário
      errorMessage(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", { email, password });

      setUser(response.data);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      localStorage.setItem("@Auth:token", response.data.token);
      setSigned(true);
      sucessMessage("Logado com sucesso!");
      navigate("/users");
    } catch (error) {
      errorMessage(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:token");
    setSigned(false);
    setUser({
      info: {
        id: 0,
        email: "",
      },
      token: "",
    });
  };

  const updateUser = async (user: UserResponse) => {
    const { id, ...rest } = user;
    try {
      await api.put(`/users/${id}`, rest);
      sucessMessage("Usuário atualizado com sucesso!");
    } catch (error) {
      errorMessage(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      sucessMessage("Usuário deletado com sucesso!");
    } catch (error) {
      errorMessage(error);
    }
  };

  const values = {
    user,
    signIn,
    signUp,
    signed,
    signOut,
    updateUser,
    deleteUser,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
