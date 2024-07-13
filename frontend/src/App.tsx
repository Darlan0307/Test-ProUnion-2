import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/contexts/user-provider";
import Routers from "./components/routers";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <>
          <Routers />
          <Toaster duration={3000} />
        </>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
