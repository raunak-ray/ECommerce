import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../../service/category.service";
import toast from "react-hot-toast";

const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => categoryService.update(data, id),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });
};

export default useUpdateCategories;
