import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ListUsers from "./pages/list-users";
import PrivateRouter from "./private-router";

const Routers = () => {
  return (
    <BrowserRouter>
      <main className="flex flex-col items-center justify-center min-h-screen p-5">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/users" element={<PrivateRouter />}>
            <Route path="/users" element={<ListUsers />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Routers;
