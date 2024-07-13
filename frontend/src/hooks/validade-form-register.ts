import { UserFormRegister } from "@/@types/type-user";
import { toast } from "sonner";

// Função para validar o email
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

// mandar notificação de erro
function sendError(message: string) {
  toast.error(message, {
    style: {
      backgroundColor: "#e0382c",
    },
  });
}

export const validadeFormRegister = (data: UserFormRegister) => {
  let isValid = true;

  if (!data.name) {
    sendError("Nome é obrigatório");
    isValid = false;
  } else if (data.name.length < 3) {
    sendError("Nome deve ter no mínimo 3 caracteres");
    isValid = false;
  }

  if (!data.email) {
    sendError("Email é obrigatório");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    sendError("Email inválido");
    isValid = false;
  }

  if (!data.password) {
    sendError("Senha é obrigatório");
    isValid = false;
  } else if (data.password.length < 6) {
    sendError("Senha deve ter no mínimo 6 caracteres");
    isValid = false;
  }

  if (data.password !== data.comfirm_password) {
    sendError("As senhas não coincidem");
    isValid = false;
  }

  return isValid;
};
