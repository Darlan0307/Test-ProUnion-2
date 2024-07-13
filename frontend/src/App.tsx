import { UserProvider } from "./components/contexts/user-provider";
import Routers from "./components/routers";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <UserProvider>
      <>
        <Routers />
        <Toaster duration={3000} />
      </>
    </UserProvider>
  );
}

export default App;
