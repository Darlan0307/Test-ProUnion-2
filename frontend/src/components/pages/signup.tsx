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

export default function SignUp() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro</CardTitle>
        <CardDescription>
          Faça seu cadastro para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" type="text" required placeholder="pedro gás" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="******"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passwordComfirm">Confirme a senha</Label>
            <Input
              id="passwordComfirm"
              type="password"
              required
              placeholder="******"
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
