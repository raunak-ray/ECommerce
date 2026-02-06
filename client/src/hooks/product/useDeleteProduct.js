import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../service/product.service";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.delteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });
};

export default useDeleteProduct;
