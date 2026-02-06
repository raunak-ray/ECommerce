import { useQuery } from "@tanstack/react-query";
import { productService } from "../../service/product.service";

const useProductById = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await productService.getProductById(productId);
      return res.data.data;
    },
    enabled: !!productId,
  });
};

export default useProductById;
