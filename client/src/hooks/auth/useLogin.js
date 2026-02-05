import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore.js";
import { authService } from "../../service/auth.service.js";
import toast from "react-hot-toast";

const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      (setUser(res.data), toast.success("User Logged in"));
    },
    onError: () => toast.error("Invalid Credentials"),
  });
};

export default useLogin;
