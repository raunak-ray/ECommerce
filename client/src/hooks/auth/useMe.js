import { useQuery } from "@tanstack/react-query";
import { authService } from "../../service/auth.service.js";

const useMe = () => {
  const setUser = (s) => s.setUser;
  const clearUser = (s) => s.clearUser;

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await authService.me();
      return res.data;
    },
    onSuccess: (data) => setUser(data),
    onError: () => clearUser(),
    retry: false,
  });
};

export default useMe;
