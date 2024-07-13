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

const ListUsers = () => {
  const navigate = useNavigate();
  const { signOut } = useUser();

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
      <div>
        <Button onClick={handleSignOut} size="icon">
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
          <TableRow>
            <TableCell className="font-medium">123</TableCell>
            <TableCell>darlan</TableCell>
            <TableCell className="max-w-[200px] overflow-hidden text-ellipsis text-nowrap">
              darlan@gmail.com
            </TableCell>
            <TableCell className="max-w-[200px] overflow-hidden text-ellipsis text-nowrap">
              senha
            </TableCell>
            <TableCell>
              <ActionsUsers />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ListUsers;
