import { UserResponse } from "@/@types/type-user";
import { useUser } from "@/components/contexts/user-provider";
import { api } from "@/services/api";
import { errorMessage } from "@/utils/error-message";
import { useEffect, useState } from "react";

export const UseDataUsers = () => {
  const [dataUsers, setDataUsers] = useState<UserResponse[]>([]);

  const { reloadData, setReloadData } = useUser();

  async function fetchDataUsers() {
    try {
      // buscando todos os dados dos usuários
      const response = await api.get("/users");
      setDataUsers(response.data);
    } catch (error) {
      // Notificando que houve um erro ao buscar os dados dos usuários
      errorMessage(error);
    }
  }

  // buscando os dados dos usuários quando a página for carregada
  useEffect(() => {
    fetchDataUsers();
  }, []);

  //  atualizar os dados dos usuários da pagina quando  o estado reloadData for atualizado
  useEffect(() => {
    if (reloadData) {
      fetchDataUsers();
      setReloadData(false);
    }
  }, [reloadData, setReloadData]);

  return {
    dataUsers,
  };
};
