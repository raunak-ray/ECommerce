import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { authService } from "../../service/auth.service";
import toast from "react-hot-toast";

const useSignup = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: (res) => {
      (setUser(res.data), toast.success("Account Created Successfully"));
    },
    onError: () => toast.error("Error in creating account"),
  });
};

export default useSignup;
