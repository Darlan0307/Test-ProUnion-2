import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionsUsers from "../actions-users";
import { useUser } from "../contexts/user-provider";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UseDataUsers } from "@/hooks/fetch-users";

const ListUsers = () => {
  const navigate = useNavigate();
  const { signOut } = useUser();
  const { dataUsers } = UseDataUsers();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    toast.success("Sessão encerrada com sucesso!", {
      style: {
        backgroundColor: "#2da04c",
      },
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={handleSignOut} size="icon" className="rounded-full">
          <LogOut />
        </Button>
      </div>
      <h2 className="text-3xl mb-8">Lista de Usuários</h2>
      <Table>
        <TableCaption>Lista de todos os usuários cadastrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataUsers.length == 0 && (
            <TableRow>
              <TableCell className="font-medium text-lg" colSpan={5}>
                Sem usuários cadastrados
              </TableCell>
            </TableRow>
          )}
          {dataUsers.length > 0 &&
            dataUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden text-ellipsis text-nowrap">
                  {user.email}
                </TableCell>
                <TableCell className="max-w-[200px] overflow-hidden text-ellipsis text-nowrap">
                  {user.password}
                </TableCell>
                <TableCell>
                  <ActionsUsers />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListUsers;
