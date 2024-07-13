import { User } from "@/@types/type-user";
import { toast } from "sonner";

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export const validadeFormRegister = (data: User) => {
  let isValid = true;

  if (!data.name) {
    toast.error("Nome é obrigatório", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  } else if (data.name.length < 3) {
    toast.warning("Nome deve ter no mínimo 3 caracteres", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  }

  if (!data.email) {
    toast.error("Email é obrigatório", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    toast.error("Email inválido", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  }

  if (!data.password) {
    toast.error("Senha é obrigatório", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  } else if (data.password.length < 6) {
    toast.warning("Senha deve ter no mínimo 6 caracteres", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  }

  if (data.password !== data.comfirm_password) {
    toast.warning("As senhas não coincidem", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
    isValid = false;
  }

  return isValid;
};
