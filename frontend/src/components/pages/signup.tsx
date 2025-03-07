import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { validadeFormRegister } from "@/utils/validade-form-register";
import { UserFormRegister } from "@/@types/type-user";
import { useUser } from "../contexts/user-provider";

export default function SignUp() {
  const [data, setData] = useState<UserFormRegister>({
    name: "",
    email: "",
    password: "",
    comfirm_password: "",
  });

  const { createUser } = useUser();

  const handleDataUser = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validadeFormRegister(data);
    // Verificando se os dados são válidos
    if (isValid) {
      // Criando o objeto do usuário
      const dataUser: Omit<UserFormRegister, "comfirm_password"> = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      // Chamando a função de criação do usuário
      await createUser(dataUser, true);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro</CardTitle>
        <CardDescription>
          Faça seu cadastro para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="pedro gás"
              onChange={(e) => handleDataUser("name", e.target.value)}
              value={data.name}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => handleDataUser("email", e.target.value)}
              value={data.email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              onChange={(e) => handleDataUser("password", e.target.value)}
              value={data.password}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passwordComfirm">Confirme a senha</Label>
            <Input
              id="passwordComfirm"
              type="password"
              placeholder="******"
              onChange={(e) =>
                handleDataUser("comfirm_password", e.target.value)
              }
              value={data.comfirm_password}
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-center">
        <p>
          Já possui uma conta?{" "}
          <Link to="/" className="underline text-muted-foreground">
            Entre
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
