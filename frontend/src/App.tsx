import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/contexts/user-provider";
import Routers from "./components/routers";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    // Usando o BrowserRouter para que a rota seja carregada no browser e não no servidor
    <BrowserRouter>
      {/* Usando o UserProvider para fornecer o contexto de usuário */}
      <UserProvider>
        <>
          {/* Usando o Routers para renderizar as rotas do aplicativo */}
          <Routers />
          {/* Usando o Toaster para exibir as mensagens de sucesso e erro */}
          <Toaster duration={3000} />
        </>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
