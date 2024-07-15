import { api } from "@/services/api";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserContext } from "./user-context";
import { UserFormRegister, UserResponse } from "@/@types/type-user";
import { errorMessage } from "@/utils/error-message";
import { sucessMessage } from "@/utils/sucess-message";
import { saveAuth } from "@/utils/save-auth";

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState(false);
  const [reloadData, setReloadData] = useState(false);
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
      // Se os dados estiverem salvos no localstorage é redirecionado para a página de usuários
      if (storageUser && storageToken) {
        setUser(storageUser);
        setSigned(true);
        navigate("/users");
        // Definindo o token no header do axios
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      }
    };
    loadingStoreData();
  }, [navigate]);

  const createUser = async (
    dataUser: Omit<UserFormRegister, "comfirm_password">,
    isNewLogin?: boolean
  ) => {
    try {
      // Criando o usuário
      const response = await api.post("/users", dataUser);

      // Se for um novo login, vamos autenticar o usuário
      if (isNewLogin) {
        setUser(response.data);

        // Salvando o token no localstorage
        saveAuth(response.data);
        setSigned(true);
        // Notificando que o usuário foi criado com sucesso
        sucessMessage("Conta criada com sucesso!");
        navigate("/users");
      }
    } catch (error) {
      // Notificando que houve um erro ao criar o usuário
      errorMessage(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", { email, password });

      setUser(response.data);

      saveAuth(response.data);
      setSigned(true);
      sucessMessage("Logado com sucesso!");
      navigate("/users");
    } catch (error) {
      errorMessage(error);
    }
  };

  const signOut = () => {
    // Removendo os dados salvos no localstorage e deslogando o usuário

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
      // Atualizando o usuário no banco de dados
      await api.put(`/users/${id}`, rest);
      // Atualizando o estado do reloadData para atualizar a lista de usuários
      setReloadData(true);
      sucessMessage("Usuário atualizado com sucesso!");
    } catch (error) {
      errorMessage(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      // Deletando o usuário no banco de dados
      await api.delete(`/users/${id}`);
      // Atualizando o estado do reloadData para atualizar a lista de usuários
      setReloadData(true);
      sucessMessage("Usuário deletado com sucesso!");
    } catch (error) {
      errorMessage(error);
    }
  };

  // valores do contexto
  const values = {
    user,
    signIn,
    createUser,
    signed,
    signOut,
    updateUser,
    deleteUser,
    reloadData,
    setReloadData,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

// hook para acessar o contexto
export const useUser = () => useContext(UserContext);
