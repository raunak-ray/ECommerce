import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../../service/category.service";
import toast from "react-hot-toast";

const useCreateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });
};

export default useCreateCategories;
