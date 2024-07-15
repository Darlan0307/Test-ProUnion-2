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
import { Link } from "react-router-dom";
import { useUser } from "../contexts/user-provider";
import { FormEvent, useState } from "react";
import { validadeFormLogin } from "@/utils/validate-form-login";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validadeFormLogin(email, password);
    // Verificando se os dados são válidos
    if (isValid) {
      await signIn(email, password);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Entre com email e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-center">
        <p>
          Não tem uma conta?{" "}
          <Link to="/register" className="underline text-muted-foreground">
            Crie agora!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
