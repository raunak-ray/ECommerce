import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../service/product.service";
import toast from "react-hot-toast";

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });
};

export default useCreateProduct;
