import { UserResponse } from "@/@types/type-user";
import { useUser } from "@/components/contexts/user-provider";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const UseDataUsers = () => {
  const [dataUsers, setDataUsers] = useState<UserResponse[]>([]);

  const { reloadData, setReloadData } = useUser();

  async function fetchDataUsers() {
    try {
      const response = await api.get("/users");
      setDataUsers(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message, {
          style: {
            backgroundColor: "#e0382c",
          },
        });
      }
    }
  }

  useEffect(() => {
    fetchDataUsers();
  }, []);

  //  atualizar os dados dos usuários
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
