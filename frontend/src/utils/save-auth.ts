import { AuthResponse } from "@/@types/type-user";
import { api } from "@/services/api";

// Função para salvar o token e o user no localstorage
export function saveAuth(data: AuthResponse) {
  api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  localStorage.setItem("@Auth:user", JSON.stringify(data.user));
  localStorage.setItem("@Auth:token", data.token);
}
