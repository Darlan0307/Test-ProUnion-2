import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./contexts/user-provider";

const PrivateRouter = () => {
  const { signed } = useUser();

  // se o usuário não estiver logado é redirecionado para a página inicial
  return signed ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
