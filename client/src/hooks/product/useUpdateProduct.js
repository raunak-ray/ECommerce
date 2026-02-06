import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../service/product.service";
import toast from "react-hot-toast";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }) =>
      productService.updateProduct(productId, data),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });
};

export default useUpdateProduct;
