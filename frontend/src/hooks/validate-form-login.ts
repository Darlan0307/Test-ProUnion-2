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

export const validadeFormLogin = (email: string, password: string) => {
  let isValid = true;

  if (!email) {
    sendError("Email é obrigatório");
    isValid = false;
  } else if (!isValidEmail(email)) {
    sendError("Email ou senha inválidos");
    isValid = false;
  }

  if (!password) {
    sendError("Senha é obrigatório");
    isValid = false;
  } else if (password.length < 6) {
    sendError("Email ou senha inválidos");
    isValid = false;
  }

  return isValid;
};
