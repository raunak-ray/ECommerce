import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../service/category.service";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryService.getAll();
      return res.data.data;
    },
  });
};

export default useCategories;
