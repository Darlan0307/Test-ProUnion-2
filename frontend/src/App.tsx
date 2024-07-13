import Routers from "./components/routers";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routers />
      <Toaster duration={3000} />
    </>
  );
}

export default App;
