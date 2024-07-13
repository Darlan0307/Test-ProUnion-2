import { api } from "@/services/api";
import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Tipo de usuário autenticado
type UserAuth = {
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
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  signed: boolean;
};

// Criando o contexto
export const UserContext = createContext({} as ContextValue);

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
        localStorage.getItem("@Auth:user") || "{}"
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
      toast.success("Conta criada com sucesso!", {
        style: {
          backgroundColor: "#2da04c",
        },
      });
      navigate("/users");
    } catch (error) {
      // Notificando que houve um erro ao criar o usuário
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message, {
          style: {
            backgroundColor: "#e0382c",
          },
        });
      }
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
      toast.success("Logado com sucesso!", {
        style: {
          backgroundColor: "#2da04c",
        },
      });
      navigate("/users");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message, {
          style: {
            backgroundColor: "#e0382c",
          },
        });
      }
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

  const values = {
    user,
    signIn,
    signUp,
    signed,
    signOut,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
