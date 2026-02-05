import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../../service/category.service";
import toast from "react-hot-toast";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });
};

export default useDeleteCategory;
