import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { UserFormRegister } from "@/@types/type-user";
import { validadeFormRegister } from "@/utils/validade-form-register";
import { FormEvent, useState } from "react";
import { useUser } from "./contexts/user-provider";

const DialogCreateUser = () => {
  const [data, setData] = useState<UserFormRegister>({
    name: "",
    email: "",
    password: "",
    comfirm_password: "",
  });

  const { createUser } = useUser();

  // Função para atualizar os dados do usuário
  const handleDataUser = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  // Função para limpar os campos
  const handleClear = () => {
    setData({
      name: "",
      email: "",
      password: "",
      comfirm_password: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validadeFormRegister(data);
    // Verificando se os dados são válidos
    if (isValid) {
      // Criando o objeto de dados para atualizar o usuário
      const user: Omit<UserFormRegister, "comfirm_password"> = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await createUser(user, false);
      handleClear();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Criar novo usuário</span>
          <Plus size={25} color="#2a9d4a" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de novo usuário</DialogTitle>
          <DialogDescription>
            O usuário será criado com as informações fornecidas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            placeholder="ex: Darlan"
            value={data.name}
            onChange={(e) => handleDataUser("name", e.target.value)}
          />
          <Input
            placeholder="ex: darlan@gmail.com"
            value={data.email}
            onChange={(e) => handleDataUser("email", e.target.value)}
          />

          <Input
            type="password"
            placeholder="senha"
            value={data.password}
            onChange={(e) => handleDataUser("password", e.target.value)}
          />
          <Input
            type="password"
            placeholder="comfirme a senha"
            value={data.comfirm_password}
            onChange={(e) => handleDataUser("comfirm_password", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleClear}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Criar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateUser;
