import { AxiosError } from "axios";
import { toast } from "sonner";

export function errorMessage(error: unknown) {
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
