import { AxiosError } from "axios";
import { toast } from "sonner";

export function errorMessage(error: unknown) {
  // Verificando se o erro é um axiosError e se tem uma mensagem de erro
  // caso seja, mostrar a mensagem de erro no toast
  if (error instanceof AxiosError && error.response?.data.message) {
    toast.error(error.response.data.message, {
      style: {
        backgroundColor: "#e0382c",
      },
    });
  } else {
    toast.error("Ocorreu um erro inesperado!", {
      style: {
        backgroundColor: "#e0382c",
      },
    });
  }
}
