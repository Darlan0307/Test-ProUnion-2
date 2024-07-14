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
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { UserFormRegister, UserResponse } from "@/@types/type-user";
import { Props } from "./actions-users";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { validadeFormUpdate } from "@/hooks/validade-form-update";
import { useUser } from "./contexts/user-provider";

const DialogUpdate = ({ user }: Props) => {
  // estado para mostrar os campos de alteração da senha
  const [open, setOpen] = useState(false);
  // Dados do usuário atual
  const [data, setData] = useState<UserFormRegister>({
    name: user.name,
    email: user.email,
    password: "",
    comfirm_password: "",
  });

  const { updateUser } = useUser();

  // Função para atualizar os dados do usuário
  const handleDataUser = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validadeFormUpdate(data, open);
    // Verificando se os dados são válidos
    if (isValid) {
      // Criando o objeto de dados para atualizar o usuário
      const userUpdate: UserResponse = {
        id: user.id,
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await updateUser(userUpdate);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-sm hover:bg-muted w-full py-1">
        Atualizar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preencha os campos abaixo</DialogTitle>
          <DialogDescription>
            Após a atualização, não poderá voltar atrás.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            value={data.name}
            onChange={(e) => handleDataUser("name", e.target.value)}
          />
          <Input
            value={data.email}
            onChange={(e) => handleDataUser("email", e.target.value)}
          />
          <div
            className="flex items-center space-x-2 w-fit"
            onClick={() => setOpen(!open)}
          >
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">
              Ative se quiser alterar a senha
            </Label>
          </div>
          {open && (
            <div className="grid gap-4">
              <Input
                type="password"
                placeholder="sua nova senha"
                value={data.password}
                onChange={(e) => handleDataUser("password", e.target.value)}
              />
              <Input
                type="password"
                placeholder="comfirme sua nova senha"
                value={data.comfirm_password}
                onChange={(e) =>
                  handleDataUser("comfirm_password", e.target.value)
                }
              />
            </div>
          )}

          <DialogClose asChild>
            <Button type="submit">Salvar</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdate;
